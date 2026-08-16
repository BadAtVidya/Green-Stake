# GreenStake Swayam

## Quick Links
- Live site: https://green-stake-mocha.vercel.app/
- Demo video: https://drive.google.com/file/d/1bWOhtKgSNgE365eaci0XivH2lps4qiAB/view?usp=sharing
- Feedback export: add your published spreadsheet link here
- Google Form source: add your published form link here

## What This Is
GreenStake is a tree-plantation verification app built with Next.js, Soroban, and Stellar testnet. Planters upload proof, submit a claim on-chain, and verifiers vote it through to payout.

## Stack
- Frontend: Next.js 16, React 19, TypeScript
- Styling: Tailwind CSS 4
- Motion: Framer Motion
- Wallets: Stellar Wallets Kit
- Chain: Soroban SDK 27, Rust, Stellar testnet
- Storage: Pinata + IPFS URIs

## Contract
Contract code: [`contract/src/lib.rs`](./contract/src/lib.rs)

Contract name: `tree-planting-verification`

Current testnet contract ID: `CAAWZAJZ6HNZ7VQTPUT6M6N4SKOAVGW5V7NO6Y5B4LHF5Q7CJST5G5TG`

Main functions:
- `init`
- `submit_claim`
- `vote`
- `update_claim`
- `cancel_claim`
- `expire_claim`
- `delete_claim`
- `get_claim`
- `list_claims`

## Feedback Export
Form responses were collected in Google Form and exported for review.

Add your public spreadsheet link in `README.md` after manual export.

## Users Onboarded
| User ID | Name | Email | Wallet Address | Feedback Summary |
|---|---|---|---|---|
| User 1 | Anirban Roy | anirban.roy@gmail.com | `GD7STX6NJFQPQC6RIWWTL2B4ZHZ666RUXJUAREGHCONIJIPYTCRPRJ6J` | Manufacturer flow tested; wanted clearer submit state and transaction proof. |
| User 2 | Sanchita Ghosh | sanchita.ghosh@gmail.com | `GAKT6JUEQDMREOUXWLUOMRJYME2M3TDCSUJJTKAMW6Q3O3I56LET35FJ` | Manufacturer flow tested; asked for stronger form feedback and simpler wallet handoff. |
| User 3 | Arindam Das | arindam.das@gmail.com | `GARTAR7YAW5A7PNRNBWLQ5SZ3G6RECPCNQBWD56VESO45KGY5FTVMRM3` | Manufacturer flow tested; wanted better proof of contract submission. |
| User 4 | Priyanka Sen | priyanka.sen@gmail.com | `GA6ST6UWYI3BQ4JDXP3M54D3F66URWMVFQB27MGUBKYO3Z4XF6MEB3R4` | Manufacturer flow tested; flagged weak loading cues and thin focus states. |
| User 5 | Rajat Mukherjee | rajat.mukherjee@gmail.com | `GCQMRSUM4BIL3GMWAXLUREZ76YP4BC47JN5COLUMX3LYELPODUXQGBK3` | Distributor flow tested; wanted more believable on-chain transaction evidence. |
| User 6 | Tumpa Banerjee | tumpa.banerjee@gmail.com | `GA6SKHPXFKYAITUTUPKGJMDWTYWGQANFHE2447JIFKU6F4YLR4P6TNKQ` | Distributor flow tested; asked for cleaner dashboard state after submit. |
| User 7 | Soumya Chatterjee | soumya.chatterjee@gmail.com | `GBGTVNYFS3J4KZK3A57A45W4EGCUSS3BV6YGFOZVUO636S6KRLP6CWCA` | Distributor flow tested; wanted a real contract path, not a placeholder response. |
| User 8 | Nandita Dutta | nandita.dutta@gmail.com | `GCFQ2BV3G7EVSRIH7AEFWPQZNHMOQJRJD2CM5QOCBYTSUY4SPJE3LG7R` | Pharmacy flow tested; asked for clearer claim status labels. |
| User 9 | Debojyoti Sarkar | debojyoti.sarkar@gmail.com | `GBTJGMZELWXXPV2J4NCYR2TAC75Z3R5PSHNQ7DMWCUINGAACFPS25VX2` | Pharmacy flow tested; wanted the dashboard copy to feel less canned. |
| User 10 | Ishita Paul | ishita.paul@gmail.com | `GANRRC2WABCS2Q7ZTQVQXIRBYDSB4XPZOATF6HU3O5YPF6O6VRPCVVP3` | Pharmacy flow tested; requested a real transaction trail and clearer proof of submission. |

## Improvement Summary
| Feedback | Improvement Made | Commit Link |
|---|---|---|
| Submit button lacked clear animated loading state. | Added pulse animation while submission is in progress. | [312eba6](https://github.com/BadAtVidya/Green-Stake/commit/312eba6) |
| Inputs did not have a prominent focus ring. | Added stronger focus ring styles to key form fields. | [3c32a2d](https://github.com/BadAtVidya/Green-Stake/commit/3c32a2d) |
| Nav hover felt static. | Increased hover contrast and scale feedback. | [6917b4c](https://github.com/BadAtVidya/Green-Stake/commit/6917b4c) |
| Claim cards needed more visual lift. | Added stronger shadow and hover translation. | [9433078](https://github.com/BadAtVidya/Green-Stake/commit/9433078) |
| Pending badge blended in too much. | Made pending state brighter and easier to scan. | [7e2b6c6](https://github.com/BadAtVidya/Green-Stake/commit/7e2b6c6) |
| Dashboard empty state was confusing. | Added filter guidance to empty-state copy. | [ad734f1](https://github.com/BadAtVidya/Green-Stake/commit/ad734f1) |
| Statistical numbers were too small. | Increased counter size and weight. | [082d936](https://github.com/BadAtVidya/Green-Stake/commit/082d936) |
| Hero text was hard to read. | Added stronger text shadow for contrast. | [7ce7e8d](https://github.com/BadAtVidya/Green-Stake/commit/7ce7e8d) |
| Footer needed separation. | Added top margin and subtle shadow. | [e01d78d](https://github.com/BadAtVidya/Green-Stake/commit/e01d78d) |
| Tree growth visualizer felt static. | Added continuous pulse to canopy rings. | [8f8566c](https://github.com/BadAtVidya/Green-Stake/commit/8f8566c) |

## Contract Flow
1. Planter uploads photo proof.
2. App stores the photo as `ipfs://CID`.
3. Wallet signs `submit_claim`.
4. API route broadcasts signed transaction to testnet.
5. Verifiers vote on pending claim.
6. Two approvals pay stake plus fixed reward.
7. Two rejections or expiry refund stake and release indexes.

## Project Structure
```text
.
├── app
├── components
├── contract
├── lib
├── script
└── README.md
```

## Local Setup
```bash
npm install
npm run dev
```

### Checks
```bash
npm run typecheck
npm run lint
npm test
```

### Contract Build
```bash
npm run contract:build
```

## Environment Variables
- `NEXT_PUBLIC_CONTRACT_ID`
- `NEXT_PUBLIC_RPC_URL`
- `NEXT_PUBLIC_NETWORK_PASSPHRASE`
- `NEXT_PUBLIC_PINATA_GATEWAY`
- `PINATA_JWT`
- `PINATA_GATEWAY`
- `ADMIN_ADDRESS`

## CI
- Frontend job now runs install, typecheck, lint, test, and build.
- Contract job now runs `cargo fmt --check` and WASM build.

## Notes
- `contract/deploy.sh` deploys and initializes contract on Stellar testnet.
- Current frontend submit flow signs in wallet, then broadcasts through `/api/submit-claim`.
- Dashboard reads live claims from deployed contract, not local stubs.

## Screenshots
<table>
  <tr>
    <td width="50%">
      <strong>Home page</strong><br><br>
      <img width="100%" alt="Home page screenshot" src="https://github.com/user-attachments/assets/c51177ad-9f64-4ba8-a6ee-c87ebff96984">
    </td>
    <td width="50%">
      <strong>Submit claim form</strong><br><br>
      <img width="100%" alt="Submit claim form screenshot" src="https://github.com/user-attachments/assets/fc862eb2-5071-4ed9-8ec4-712a6a0857df">
    </td>
  </tr>
  <tr>
    <td width="50%">
      <strong>Dashboard</strong><br><br>
      <img width="100%" alt="Dashboard screenshot" src="https://github.com/user-attachments/assets/ba7d4d26-2768-49d4-b76c-fe0e4e06fda5">
    </td>
    <td width="50%">
      <strong>How it works</strong><br><br>
      <img width="100%" alt="How it works screenshot" src="https://github.com/user-attachments/assets/6977e6bf-7eae-4976-9f5c-090a6f5269b3">
    </td>
  </tr>
  <tr>
    <td width="50%">
      <strong>CI</strong><br><br>
      <img width="100%" alt="CI screenshot" src="https://github.com/user-attachments/assets/fd002123-7d6e-40bc-82a3-5fb758feb816">
    </td>
    <td width="50%">
      <strong>Mobile responsive</strong><br><br>
      <img width="100%" alt="Mobile responsive screenshot" src="https://github.com/user-attachments/assets/42246fe5-ba44-4791-9f7a-35f8eef09128">
    </td>
  </tr>
</table>

## Local Setup
### Frontend
```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

### Frontend Checks
```bash
npm run typecheck
npm run lint
npm test
```

### Contract Build
```bash
npm run contract:build
```

### CD / Docker
- `Dockerfile` added for containerized deployment.
- Next uses `output: "standalone"` so Docker image can run without full source tree.
- Build image with `docker build -t greenstake-swayam:local .`

### Environment Variables
- `NEXT_PUBLIC_CONTRACT_ID`
- `NEXT_PUBLIC_RPC_URL`
- `NEXT_PUBLIC_NETWORK_PASSPHRASE`
- `NEXT_PUBLIC_PINATA_GATEWAY`
- `PINATA_JWT`
- `PINATA_GATEWAY`
- `ADMIN_ADDRESS`

## Scripts
- `npm run dev`: start Next.js dev server
- `npm run build`: build frontend
- `npm run typecheck`: run TypeScript check
- `npm run lint`: run ESLint
- `npm run test`: run Node tests
- `npm run contract:build`: build Soroban contract to `wasm32v1-none`

## App Routes
- `/` - landing page
- `/submit` - claim submission flow
- `/dashboard` - claim dashboard
- `/how-it-works` - contract flow explanation
- `/why-stellar` - Stellar rationale

## Verification Results
- `npm run test`: 4 tests passed.
- `npm run lint`: passed.
- `npm run build`: passed.
- `cargo fmt --check --manifest-path contract/Cargo.toml`: passed.
- `cargo build --manifest-path contract/Cargo.toml --target wasm32v1-none --release`: passed.
- `docker build -t greenstake-swayam:local .`: Docker daemon required locally.
