# Beam Designer

## Purpose
Shear, moment, and deflection diagrams for a beam, with a check of
whether the beam is strong and stiff enough.

## Inputs
- Simply supported or cantilever, and the span (ft)
- Point loads and uniform loads
- A steel W-shape or a lumber size

## Calculations
- Reactions, shear, and moment from statics
- Deflection
- Bending stress fb = M/S, compared to the allowable stress
- Deflection compared to L/360

## Outputs
- The beam with its loads, and the three diagrams
- Pass or fail for bending and deflection

## Look and feel
Clean and professional, with an example beam loaded when it opens.

## Validation
20 ft simply supported W12x26 with 1 kip/ft: M = 50.0 kip-ft,
deflection 0.609 in.

## Out of scope
Continuous beams and buckling.