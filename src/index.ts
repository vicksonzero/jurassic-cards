import { Piece } from './pieces/Piece';
import { add } from './utils/math';
import './index.scss'
import { PhysicsSystem } from './PhysicsSystem';
import { b2Body, b2IMouseJointDef, b2MouseJoint, b2MouseJointDef, b2Vec2, b2DrawFlags } from '@flyover/box2d';
import { DebugDraw } from './utils/DebugDraw';
import { PIXEL_TO_METER, METER_TO_PIXEL, WORLD_WIDTH, WORLD_HEIGHT, PHYSICS_MAX_DRAG_FORCE } from './constants';
import { WorldBorders } from './WorldBorders';
import { Card } from './pieces/Card';
import { cardBack1, cardBack2 } from './pieces/cardFaces/cardBacks';
import { tileCard } from './pieces/cardFaces/tileCard';


const physicsSystem = new PhysicsSystem();
physicsSystem.init();
const worldBorders = new WorldBorders();
worldBorders.createPhysics(physicsSystem);

const domRoot = document.querySelector('#app');
if (domRoot == null) throw new Error('No div #app found, cannot start app!');

const debugCanvas = (document.querySelector('#debugCanvas') as HTMLCanvasElement);
debugCanvas.width = WORLD_WIDTH * PIXEL_TO_METER;
debugCanvas.height = WORLD_HEIGHT * PIXEL_TO_METER;
debugCanvas.style.width = WORLD_WIDTH + 'px';
debugCanvas.style.height = WORLD_HEIGHT + 'px';
debugCanvas.style.backgroundColor = '#eeeeee';
const debugCtx = debugCanvas.getContext("2d");
const debugDraw = new DebugDraw();
debugDraw.m_ctx = debugCtx;
physicsSystem.world.SetDebugDraw(debugDraw);

let flags = b2DrawFlags.e_none;
flags |= b2DrawFlags.e_shapeBit;
// flags |= b2DrawFlags.e_particleBit;
// flags |= b2DrawFlags.e_jointBit;
flags |= b2DrawFlags.e_aabbBit;
flags |= b2DrawFlags.e_centerOfMassBit;
// flags |= b2DrawFlags.e_controllerBit;
debugDraw.SetFlags(flags);


const cardFaceDelegate = tileCard({});
const cardBackDelegate = cardBack1({});
const w = 100;
const h = 100 * 1.667;
let x = 10 + w / 2;
let y = 10 + h / 2;
for (let i = 0; i < 10; i++) {
    Piece.appendPieceTo(domRoot, new Card(0, x + i * (w + 10), y, w, h)
        .withCardFace(cardFaceDelegate)
        .withCardBack(cardBackDelegate)
        .createDom()
        .createPhysics(physicsSystem)
    );
}

const deselectAllPieces = (except?: Piece) => {
    domRoot.childNodes.forEach(pieceDom => {
        const piece = (pieceDom as any).parentPiece as Piece;
        if (!!except && piece === except) return;

        piece?.toggleSelected(false);
    });
}

// drag

let mouseJoint: b2MouseJoint | null = null;
let dragStartTime = 0;
let dragStartPos = { x: 0, y: 0 };
const createMouseJoint = (draggedBody: b2Body, point: b2Vec2) => {
    const dummyBody = worldBorders.b2Body;
    if (!dummyBody) {
        console.warn(`Can't create mouseJoint, world has no border?!`);
        return null;
    }


    //if joint exists then create
    var def = new b2MouseJointDef() as b2IMouseJointDef;

    def.bodyA = dummyBody;
    def.bodyB = draggedBody;
    def.target = point;

    def.collideConnected = true;
    def.maxForce = PHYSICS_MAX_DRAG_FORCE * draggedBody.GetMass();
    def.dampingRatio = 1;
    def.frequencyHz = 1;
    return physicsSystem.world.CreateJoint(def);
};

// let countMoves = 0;
// let canDrag = true;
// const resetCanDrag = () => {
//     canDrag = true;
//     window.requestAnimationFrame(resetCanDrag);
// };
// window.requestAnimationFrame(resetCanDrag);
window.addEventListener('pointerdown', (evt: PointerEvent) => {
    console.log('pointerdown');

    const piece = (evt.target as any).parentPiece as Piece | undefined;
    if (!piece) {
        deselectAllPieces();
        return;
    }
    if (!piece.b2Body) return;

    evt.preventDefault();
    evt.stopPropagation();

    dragStartTime = Date.now();
    dragStartPos = { x: evt.x, y: evt.y };
    piece.bringToTop().toggleDragged(true);
    deselectAllPieces(piece);

    const point = new b2Vec2(
        evt.x * PIXEL_TO_METER,
        evt.y * PIXEL_TO_METER
    );
    if (mouseJoint) physicsSystem.world.DestroyJoint(mouseJoint);
    mouseJoint = createMouseJoint(piece.b2Body, point);
    // piece.b2Body.SetType(b2BodyType.b2_kinematicBody);
    // piece.b2Body.SetAwake(true);
});
window.addEventListener('pointermove', (evt: PointerEvent) => {
    if (!mouseJoint) return;
    evt.preventDefault();
    evt.stopPropagation();
    // if (!canDrag) return;

    // countMoves++;
    // if (countMoves % 10 === 0) console.log('countMoves 10 times');

    // if (canDrag) {
    mouseJoint.SetTarget(new b2Vec2(
        evt.x * PIXEL_TO_METER,
        evt.y * PIXEL_TO_METER
    ));
    mouseJoint.GetBodyB().SetAwake(true);
    //     canDrag = false;
    // }
});
window.addEventListener('pointerup', (evt: PointerEvent) => {
    console.log('pointerup');
    if (!mouseJoint) return;
    evt.preventDefault();
    evt.stopPropagation();
    // console.log(`countMoves ${countMoves} times`);

    const draggedBody = mouseJoint.GetBodyB();
    const piece: Piece = draggedBody?.GetUserData()?.gameObject;
    if (!piece) return;

    piece.toggleDragged(false);
    physicsSystem.world.DestroyJoint(mouseJoint);
    // draggedBody.SetType(b2BodyType.b2_dynamicBody);
    mouseJoint = null;

    const dragTime = Date.now() - dragStartTime;
    const dragDist = Math.sqrt((dragStartPos.x - evt.x) * (dragStartPos.x - evt.x) + (dragStartPos.y - evt.y) * (dragStartPos.y - evt.y));
    const isLongPress = (dragTime > 1000);

    if (isLongPress) return;
    if (dragDist > 1) return;
    piece.onClick();
});



// loop
const frameSize = 16;
const timeStep = Math.floor(1000 / frameSize);

setInterval(() => {
    const ctx = debugDraw.m_ctx;
    if (ctx) ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // if (mouseJoint) mouseJoint.SetTarget(new b2Vec2(
    //     mouseJoint.m_targetA.x,
    //     mouseJoint.m_targetA.y
    // ));
    physicsSystem.update(
        timeStep,
        // (DEBUG_PHYSICS ? this.physicsDebugLayer : undefined)
    );
    // mouseJoint && physicsSystem.world.DrawJoint(mouseJoint);

}, frameSize);
