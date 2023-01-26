# Jurassic-Cards



# Setup

```bash
cp .env.example .env # and then fill in secrets
npm i
npm run dev
```

Set up `.env` values with 

Entry point: `src/index.ts`

# Play here

http://localhost:8080/?apiKey={GOOGLE_SHEETS_API_KEY}&workbookId={GOOGLE_SHEETS_WORKBOOK_ID}


# Controls


Card
- **Drag** card to move
- **Tap** card to select
- **Tap** selected card to action (usually flips it)
- **Tap-hold** card for menu
  - rotate (aka tap-card)
  - flip

Stack
- **Drag** card onto another card to create stack
- **Drag** stack to move
- **Tap** stack to select
- **Tap** selected stack to action (draw 1)
- **Tap-hold** stack for menu
  - shuffle stack
  - flip whole stack
  - cut stack
  - spread stack
  - make grid
  - turn to deck
  - deal X card

# Tech Stack

- GoogleSheets
- HTML
- typescript
- box2d.ts
- rollup.js
- Assets:
  - https://game-icons.net




# Old notes

```
card has face and back
tap to select
tap selected to action
long-pressing always drags the piece
long-pressing and release always opens menu

tap card to select, tap-hold to open menu (tap, flip)

tap selected card to action (rotate card)

when the menu is open, the card is also zoomed to the screen

drag card any time to move


piece: stack
drag the card to another card to create stack

stacks allow both cards of face-up or face-down to be added

tap stack to select

tap selected stack to action (draw 1)
drawing from the stack removes the top card from it, into a loose card piece.
Q: do we drag the card directly or require another click?

tap-hold at any time for menu (shuffle, flip whole stack, cut, spread, make grid, turn to deck, deal)

drag stack to move
(what about dragging an unselected stack vs selected?)


stack.spreadMode
when a stack is on spread mode (icon shown), drag top card to spread it.
the lowest card in the stack won't move. drag in a direction to select drag direction and drag length.
a spread stack is still a stack, except you can select any card within the stack.
tap-hold a spread stack for menu (spread, re-stack)

drag stack to (?)


tools: 
change to pan mode to operate on camera. drag to pan, pinch to zoom and rotate



widgets include tokens, dice, calculator, notepad (with calculations?)

tap dice to select, tap selected dice to action(roll), tap-hold for menu (set value, delete)

a deck is a stack that can reset even if cards are drawn. it will generate a record in the ui and can reset quickly.


multi-select by dragging a box around items, tap or tap-hold to open menu (make stack, align




Any actions:
short tap
tap-hold
drag
tick
mouse up

states:
locked
selected
dragging




```