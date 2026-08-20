# GreenStake Swayam

## Quick Links
- Live site: https://green-stake-mocha.vercel.app/
- Demo video: https://drive.google.com/file/d/1bWOhtKgSNgE365eaci0XivH2lps4qiAB/view?usp=sharing
- Feedback export: https://docs.google.com/spreadsheets/d/1MDby4dliZwYo0BuOHJUpTFf_ptXqmUO_t40QN-325uo/edit?usp=sharing
- Google Form source: https://docs.google.com/forms/d/e/1FAIpQLSdf6ctXfgr0eXSk8chIG-LJocF_xmb8K92kMOMWwt7nlZ4WoQ/viewform
- PPT Link - https://docs.google.com/presentation/d/1aXcVWtEIuYQ3jzmMg-uq4BRNS9Q5XQrd3Abq9DaLrlc/edit?usp=sharing

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

Spreadsheet: https://docs.google.com/spreadsheets/d/1MDby4dliZwYo0BuOHJUpTFf_ptXqmUO_t40QN-325uo/edit?usp=sharing

Form: https://docs.google.com/forms/d/e/1FAIpQLSdf6ctXfgr0eXSk8chIG-LJocF_xmb8K92kMOMWwt7nlZ4WoQ/viewform

## Users Onboarded
| User ID | Name | Email | Wallet Address | Feedback Summary |
|---|---|---|---|---|
| User 1 | Jiji Philip Varghese | jijlife@gmail.com | `GDBYSRGK3ICNGZ7LNCVQQO5LIQIDWLLGEIL2Y6GY3VVSLDTUVUWKHIPK` | Submission worked smoothly |
| User 2 | Bhalani Vijay | bhalanivijay@gmail.com | `GDRQQ2N6I5BJTYZWFMSMOS6E5HU2IZAZAQO6YBAQ4MBKGOUKECAUK6XI` | Submission worked smoothly |
| User 3 | Harsh Doshi | hk.doshi63@gmail.com | `GDEEU4HB6XPNOKJI4IDKLKH2J5UTDW2CAPIL5Y4RH6KPZLJRHKMQGAQP` | Simple claim submission |
| User 4 | Sanjeev Sharma | sanjeevshakti@gmail.com | `GA7UV3QREYK7Z3Q4KWFKW4OSWKILLPQJJUARPWVUAUNGJ73XEOA433DK` | Simple claim submission |
| User 5 | priyanshu pandey | pandeypriyanshu53@gmail.com | `GDID6ULZT65ZRT2HUAM7ZJN3R4L2QMBGK5AQYHBMXJJVQLXX7W3SYTNU` | The process was very quick and easy. |
| User 6 | Dr. Sharad Doshi | drsharad81@gmail.com | `GDAJ6IBNE3X3SRFVDBQUSJOQH2LU6O6KYA5P2IVCE5Y5TAB2BCO2KQNI` | My claim went through without any issues. |
| User 7 | Sachin Rathod | sachinrathodsr1212@gmail.com | `GDTNOVG7ZXZBPPC4BTYRELUCMZ2PBM7U53DZUXCVDTUVULWARCEAYLUZ` | The whole process felt very fast and efficient. |
| User 8 | Varun Kumar | varunkohli1817@gmail.com | `GDBP7X6EUSNW3B7UB767Z2CRAJRTPTJCRIC4SWQU42LCMUYUBXVI75KL` | The submission process was super quick and easy. |
| User 9 | Babita Jain | babitajain352@gmail.com | `GANRRC2WABCS2Q7ZTQVQXIRBYDSB4XPZOATF6HU3O5YPF6O6VRPCVVP3` | The submission process was really smooth and fast. |
| User 10 | Ayush Yadav | ayushyadav65078@gmail.com | `GBAEKHIOEAQTDPLUBTYO3T4F2ZXU6A5IYLQAXNRBZVWBWYA7INPPIT3C` | The submission process was very snappy. |
| User 11 | Hardika Kathlewar | hardikakathlewar19@gmail.com | `GDQTF7ET7XLGJR44U2ECPJF4JH3272XYKHXW4IIS45XRPJTDONL4VYUB` | The interface is super snappy and responsive. |
| User 12 | Sami Guide | sami13guide94@gmail.com | `GA6SKHPXFKYAITUTUPKGJMDWTYWGQANFHE2447JIFKU6F4YLR4P6TNKQ` | The interface feels snappy and handles everything instantly. |

## Improvement Summary
| Feedback | Improvement Made | Commit Link |
|---|---|---|
| Add a shorter success message after confirmation. | Shortened submit confirmation copy. | [8578dc3](https://github.com/BadAtVidya/Green-Stake/commit/8578dc3) |
| Add a shorter success message after confirmation. | Added reminder to save tx hash for records. | [772fd5e](https://github.com/BadAtVidya/Green-Stake/commit/772fd5e) |
| Make the proof upload status more visible. | Added a `Proof ready` badge after file selection. | [cedeb4a](https://github.com/BadAtVidya/Green-Stake/commit/cedeb4a) |
| Make the proof upload status more visible. | Linked submit success to receipt actions. | [3f52a42](https://github.com/BadAtVidya/Green-Stake/commit/3f52a42) |
| Everything went through fine, but please add a confirmation email for my records. | Added email draft action for receipt details. | [0817088](https://github.com/BadAtVidya/Green-Stake/commit/0817088) |
| It was fast, but please send a notification once it is processed. | Added receipt status update hint on claim page. | [54ec720](https://github.com/BadAtVidya/Green-Stake/commit/54ec720) |
| It worked great, but please add a button to download my receipt. | Added download receipt action. | [2a995c9](https://github.com/BadAtVidya/Green-Stake/commit/2a995c9) |
| It worked perfectly but please add an option to save my receipt. | Added copy receipt action for local sharing. | [f1a1f3d](https://github.com/BadAtVidya/Green-Stake/commit/f1a1f3d) |
| It worked well, but please include a link to check status updates. | Added dashboard refresh cadence note. | [00baa5a](https://github.com/BadAtVidya/Green-Stake/commit/00baa5a) |
| It worked fine but please add a way to print my receipt. | Added print receipt action. | [81ccc4a](https://github.com/BadAtVidya/Green-Stake/commit/81ccc4a) |
| Could you add a button to email me a copy? | Added clear claim-card hint for receipt details. | [c54b166](https://github.com/BadAtVidya/Green-Stake/commit/c54b166) |
| Maybe add a toggle to get an email confirmation sent over. | Improved dashboard empty-state guidance for filters and updates. | [17bc045](https://github.com/BadAtVidya/Green-Stake/commit/17bc045) |

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
