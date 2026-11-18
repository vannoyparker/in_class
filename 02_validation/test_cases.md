# Test cases (hand calculations)

W12x26: I = 204 in⁴, S = 33.4 in³, E = 29,000 ksi, Fb = 0.66 × 50 = 33 ksi.
Units: work in kips and inches for deflection (w in kip/in = kip/ft ÷ 12, L in in = ft × 12).

| # | Beam | Hand calculation | Expected |
|---|------|------------------|----------|
| 1 | **Spec case.** Simple, 20 ft, W12x26, w = 1 k/ft full span | R = wL/2; M = wL²/8 = 1(20²)/8; Δ = 5wL⁴/384EI = 5(1/12)(240⁴)/(384·29000·204); fb = 50·12/33.4 | R = 10.0 k, M = **50.0 kip-ft**, Δ = **0.609 in**, fb = 17.96 ksi, L/360 = 0.667 in → both PASS |
| 2 | Simple, 20 ft, W12x26, P = 10 k at midspan | M = PL/4; Δ = PL³/48EI = 10(240³)/(48·29000·204) | R = 5.0 k, M = 50.0 kip-ft, Δ = 0.487 in |
| 3 | Simple, 20 ft, W12x26, P = 10 k at x = 5 ft | RA = P·b/L = 10·15/20; M = Pab/L = 10·5·15/20 | RA = 7.5 k, RB = 2.5 k, M = 37.5 kip-ft at x = 5 |
| 4 | Simple, 20 ft, W12x26, w = 2 k/ft from 0 to 10 ft | W = 20 k at 5 ft → RB = 20·5/20, RA = 15; V = 0 at x = 15/2; M = 15(7.5) − 2(7.5²)/2 | RA = 15 k, RB = 5 k, M = 56.25 kip-ft at x = 7.5 |
| 5 | Cantilever, 10 ft, W12x26, P = 2 k at tip | R = P; M = PL; Δ = PL³/3EI = 2(120³)/(3·29000·204) | R = 2 k, M = 20.0 kip-ft at wall, Δ = 0.195 in at tip |
| 6 | Cantilever, 10 ft, W12x26, w = 1 k/ft full span | R = wL; M = wL²/2; Δ = wL⁴/8EI = (1/12)(120⁴)/(8·29000·204) | R = 10 k, M = 50.0 kip-ft, Δ = 0.365 in |
| 7 | Simple, 12 ft, 2x10 DF-L No. 2, w = 0.1 k/ft | S = 1.5(9.25²)/6 = 21.39 in³, I = 1.5(9.25³)/12 = 98.93 in⁴; M = 0.1(144)/8 = 1.8 kip-ft; fb = 1.8·12/21.39; F'b = 900 × 1.1 = 990 psi; Δ = 5(0.1/12)(144⁴)/(384·1600·98.93) | fb = 1.010 ksi > 0.990 ksi → bending **FAIL** (ratio 1.02); Δ = 0.295 in ≤ 0.400 in → PASS |

Run `node 02_validation/run_tests.js` to check the app's calculations against this table.
