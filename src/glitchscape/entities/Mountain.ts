import type { Position, Size } from '@/utilities/types'
import type { MountainProps, ShapeKind, Stage } from '@/glitchscape/types'
import type { Profile, ProfileSeed } from '@/glitchscape/profiles'
import {
  buildProfile,
  createSeed,
  morphProfile,
  resolveShape,
  shatterProfile,
} from '@/glitchscape/profiles'
import { fadeAt, haze, hazeAt, rampAt, stepDepth } from '@/glitchscape/ramp'
import { bend } from '@/glitchscape/bend'
import { HSLColors } from '@/utilities/colors'
import {
  clamp,
  lerp,
  random,
  randomFloat,
  toRadians,
  wrap,
} from '@/utilities/operations'

/** Tones a range is allowed to take. Few enough that each sheet is flat. */
const PAPER_STEPS = 7

/** Share of a band spent turning over to the next one, rather than flat. */
const PAPER_BLEND = 0.3

/**
 * How far a sheet carries on below its own ground line, as a share of its
 * height. A climbing corridor swings the far end of the range up into frame,
 * and a sheet that stops at its foot shows the straight cut across the bottom
 * of it. Carrying it well past the water keeps the cut out of the picture.
 */
const SKIRT = 2

/** A corridor never fully collapses, so the proportional rescale stays safe. */
export const clampCorridor = (corridor: number) => clamp(corridor, 0.05, 3)

/** Same guard for the height multiplier, for the same reason. */
export const clampRelief = (relief: number) => clamp(relief, 0.2, 4)

/**
 * The relief. A mountain is a billboard whose silhouette is a normalised
 * height profile, cut flat with no thickness at all. Changing the scene
 * shape rebuilds the target profile and the mountain morphs into it, so an
 * universe can be swapped mid-journey without a reset.
 */
export class Mountain {
  props: MountainProps
  size: Size
  position: Position
  seed: ProfileSeed
  shape: ShapeKind
  request: ShapeKind
  resolution: number
  turbulence: number
  spread: number
  lift: number
  profile: Profile
  target: Profile
  params: {
    radians: number
    speed: number
    morphSpeed: number
    order: number
    gap: number
    isStrokedOnly: boolean
    alpha: number
    isRetiring: boolean
    retirement: number
  }
  backup: {
    width: number
    height: number
  }

  constructor(stage: Stage, props: MountainProps) {
    this.props = props
    this.size = {
      width: Math.round(
        randomFloat(this.props.widthRange[0], this.props.widthRange[1])
      ),
      height: Math.round(
        randomFloat(this.props.heightRange[0], this.props.heightRange[1])
      ),
    }
    this.position = {
      x: Math.round(this.props.x),
      y: Math.round(this.props.y),
      z: Math.round(random(this.props.zRange[0], this.props.zRange[1])),
    }
    this.seed = createSeed()
    this.request = stage.scene.shape
    this.shape = resolveShape(this.request)
    this.resolution = stage.resolution
    this.turbulence = stage.scene.turbulence
    this.spread = clampCorridor(stage.scene.corridor)
    this.lift = clampRelief(stage.scene.relief)
    this.profile = this.build(stage)
    this.target = this.profile.slice()
    this.params = {
      radians: toRadians(90),
      speed: 0.05,
      morphSpeed: 0.05,
      order: 0,
      gap: 20,
      isStrokedOnly: true,
      alpha: 0,
      isRetiring: false,
      retirement: 0,
    }
    this.backup = {
      width: this.size.width,
      height: this.size.height,
    }
  }

  private build = (stage: Stage): Profile =>
    buildProfile(
      this.shape,
      this.resolution,
      this.seed,
      this.turbulence,
      (x: number) => stage.sk.noise(x)
    )

  /** Picks up a live scene change: new silhouette, new resolution. */
  private sync = (stage: Stage) => {
    const hasShapeChanged = stage.scene.shape !== this.request,
      hasResolutionChanged = stage.resolution !== this.resolution,
      hasTurbulenceChanged = stage.scene.turbulence !== this.turbulence

    if (!hasShapeChanged && !hasResolutionChanged && !hasTurbulenceChanged)
      return

    this.request = stage.scene.shape
    this.shape = hasShapeChanged ? resolveShape(this.request) : this.shape
    this.turbulence = stage.scene.turbulence

    if (hasResolutionChanged) {
      this.resolution = stage.resolution
      this.profile = this.build(stage)
      this.target = this.profile.slice()
      return
    }

    this.target = this.build(stage)
  }

  glitch = () => {
    this.backup = {
      width: this.size.width,
      height: this.size.height,
    }
  }

  unglitch = () => {
    this.size.width = this.backup.width
    this.size.height = this.backup.height
  }

  /**
   * Asks the sheet to leave.
   *
   * A range that thins out used to lose its summits between two frames. It
   * folds back down instead, the way it stood up: the same rotation, run the
   * other way, so a disposition with fewer mountains reads as the range lying
   * down rather than as a gap where one was.
   */
  retire = () => (this.params.isRetiring = true)

  /**
   * True once it is out of sight rather than merely on its way: flat to
   * within three degrees, and down to a hundredth of its opacity. Taken out
   * any earlier and what is dropped is still a visible sliver.
   */
  hasFolded = () => this.params.retirement > 0.97

  wireframe = () => (this.params.isStrokedOnly = true)

  unwireframe = () => (this.params.isStrokedOnly = false)

  /**
   * Advances the sheet without drawing it.
   *
   * The two are separate because a sheet can wrap from the near end of the
   * corridor to the far end inside this call. Drawing as it moves left the
   * whole range sorted on where everything was a frame ago, and the one that
   * had just wrapped — now the furthest, now the colour of the sky — was
   * still painted last, over everything.
   */
  advance = (stage: Stage) => {
    const sk = stage.sk,
      bounds = stage.bounds,
      drift = stage.flow.drift,
      step = stage.speed,
      band = Math.abs(this.size.height) * 0.5

    this.sync(stage)

    const corridor = clampCorridor(stage.scene.corridor)
    if (Math.abs(corridor - this.spread) > 0.0005) {
      const next = lerp(this.spread, corridor, 0.04),
        ratio = next / this.spread
      this.position.x *= ratio
      this.spread = next
    }

    const relief = clampRelief(stage.scene.relief)
    if (Math.abs(relief - this.lift) > 0.0005) {
      const next = lerp(this.lift, relief, 0.04),
        ratio = next / this.lift
      this.size.height *= ratio
      this.backup.height *= ratio
      this.lift = next
    }

    this.position.z = wrap(
      this.position.z + drift.z * step,
      this.props.zRange[0],
      this.props.zRange[1]
    )
    this.position.x = wrap(
      this.position.x + drift.x * step * 0.5,
      -bounds.limitX * 1.5 * this.spread,
      bounds.limitX * 1.5 * this.spread
    )
    this.position.y = wrap(
      this.position.y + drift.y * step * 0.35,
      this.props.y - band,
      this.props.y + band
    )

    if (sk.millis() > this.params.order * this.params.gap)
      this.params.radians = lerp(
        this.params.radians,
        this.params.isRetiring ? toRadians(90) : 0,
        this.params.speed
      )

    if (this.params.isRetiring)
      this.params.retirement = lerp(
        this.params.retirement,
        1,
        this.params.speed
      )

    if (stage.isGlitched) {
      this.size.width = randomFloat(0, this.backup.width * 2)
      this.size.height = randomFloat(0, this.backup.height)
      this.profile = shatterProfile(this.target, 0.65)
    } else {
      this.profile = morphProfile(
        this.profile,
        this.target,
        this.params.morphSpeed
      )
    }

    // A sheet that never quite reaches 1 keeps blending switched on, and
    // blended surfaces drawn in the wrong order swap places frame to frame.
    // A sheet on its way out fades at the rate it folds, so it reaches
    // nothing and flat together rather than one long after the other.
    //
    // This is how present the sheet is, not how filled: a wireframe is drawn
    // with the same value on its stroke instead. Taking it to nothing here
    // was taking the wireframe with it.
    const opacity = lerp(
      this.params.alpha,
      this.params.isRetiring ? 0 : 1,
      this.params.speed * (this.params.isRetiring ? 1 : 0.5)
    )
    this.params.alpha = opacity > 0.99 ? 1 : opacity
  }

  /**
   * The sheet itself: one flat shape from the ground line up to the
   * silhouette, in a single tone. Nothing is extruded and nothing is shaded —
   * a cut out of coloured paper is exactly one colour.
   */
  private face = (sk: any) => {
    const steps = this.profile.length

    const skirt = Math.abs(this.size.height) * SKIRT

    sk.beginShape(sk.TRIANGLE_STRIP)
    for (let i = 0; i < steps; i++) {
      const x = (i / (steps - 1)) * this.size.width
      sk.vertex(x, skirt, 0)
      sk.vertex(x, this.size.height * this.profile[i], 0)
    }
    sk.endShape()
  }

  private outline = (sk: any) => {
    const steps = this.profile.length,
      skirt = Math.abs(this.size.height) * SKIRT

    sk.beginShape()
    sk.vertex(0, skirt, 0)
    for (let i = 0; i < steps; i++)
      sk.vertex(
        (i / (steps - 1)) * this.size.width,
        this.size.height * this.profile[i],
        0
      )
    sk.vertex(this.size.width, skirt, 0)
    sk.endShape(sk.CLOSE)
  }

  draw = (stage: Stage) => {
    const sk = stage.sk,
      // Depth is the distance travelled along the corridor, bent or not, so
      // aerial perspective reads the same on an arc as on a straight run.
      fog = hazeAt(this.position.z, this.props.zRange[0], 0.5),
      // Passing the camera is an opacity, not a colour: a sheet the tone
      // of the sky still paints over everything behind it.
      opacity =
        this.params.alpha *
        (1 - fadeAt(this.position.z, this.props.zRange[0], 0.08, 0.02)),
      tint = haze(
        rampAt(
          stage.scene.palette.mountains,
          stepDepth(
            this.position.z,
            this.props.zRange[0],
            this.props.zRange[1],
            PAPER_STEPS,
            PAPER_BLEND
          ),
          this.props.zRange[0],
          this.props.zRange[1]
        ),
        stage.scene.palette.sky,
        fog
      ),
      // The lit crest has to fade with the rest, or the band alone would
      // announce a mountain the moment it enters the range.
      corrupted = stage.isGlitched
        ? Object.values(HSLColors)[random(0, Object.values(HSLColors).length)]
        : null

    // An invisible sheet still writes depth and would occlude whatever is
    // drawn after it, so it is dropped before it reaches the buffer.
    if (opacity <= 0.01) return

    // The card never turns: it slides along the corridor facing the camera,
    // whether that corridor runs straight or curls away.
    //
    // A card on the left is mirrored by exactly its own width, so its inner
    // edge lands on its position rather than a fraction of a mountain behind
    // it. Anything else and the two walls stop being a corridor.
    const placed = bend(
      stage.flow.axis,
      stage.flow.turn,
      stage.turnRadius,
      this.position.x < 0 ? this.position.x - this.size.width : this.position.x,
      this.position.y,
      this.position.z
    )

    const shown = corrupted !== null ? corrupted : tint

    sk.push()
    sk.translate(placed.x, placed.y, placed.z)
    sk.rotateX(this.params.radians)

    // Paper has no wire around it, and a wireframe has no paper in it: one or
    // the other, never a filled face carrying an outline it cannot show.
    if (this.params.isStrokedOnly) {
      sk.noFill()
      sk.stroke(shown.hue, shown.saturation, shown.lightness, opacity)
      sk.strokeWeight(1)
      this.outline(sk)
    } else {
      sk.noStroke()
      sk.fill(shown.hue, shown.saturation, shown.lightness, opacity)
      this.face(sk)
    }

    sk.pop()
  }
}
