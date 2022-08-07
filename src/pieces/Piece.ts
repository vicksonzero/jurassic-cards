import { b2Body, b2PolygonShape } from "@flyover/box2d";
import { IFixtureUserData, PhysicsSystem, PhysicsTransform } from "../PhysicsSystem";
import { b2FixtureDef, b2CircleShape, b2BodyDef, b2BodyType } from "@flyover/box2d";
import { collisionCategory } from "../utils/collisionCategory";
import { PIXEL_TO_METER } from "../constants";




const getPhysicsDefinitions = (width: number, height: number) => {

    // body shape definition. can have many
    const fixtureDef = new b2FixtureDef();

    // doesn't participate in collisions? need to check
    // fixtureDef.isSensor = false;

    // mass per volume
    fixtureDef.density = 1;

    // friction against other solids?
    fixtureDef.friction = 0;

    // bounciness
    fixtureDef.restitution = 0;

    fixtureDef.shape = new b2PolygonShape();
    (fixtureDef.shape as b2PolygonShape).SetAsBox(width / 2, height / 2);

    // I am a...
    fixtureDef.filter.categoryBits = collisionCategory.PLAYER;

    // I can collide with...
    fixtureDef.filter.maskBits = collisionCategory.WORLD;


    // body def defines the body (well...)
    const bodyDef = new b2BodyDef();

    // dynamic(moving), static(walls) or kinematic(moving walls)
    bodyDef.type = b2BodyType.b2_dynamicBody;

    // bodyDef.bullet = false;

    bodyDef.linearDamping = 0.001;
    // bodyDef.angularDamping = 1;

    bodyDef.fixedRotation = true;

    // sleeping disables physics when not moving.
    // troublesome to wake it back though
    bodyDef.allowSleep = true;

    return {
        fixtureDef,
        bodyDef,
    };
}


export abstract class Piece implements PhysicsTransform {

    /*
     * === Any Piece ===
     * IDLE:
     * Tap to SELECT
     * Tap-hold to open menu
     * Drag to move
     * 
     * SELECTED:
     * Tap to action (such as flip, draw card, select from spread stack)
     * Drag to move
     * 
     */

    public dom?: HTMLDivElement;

    public b2Body?: b2Body;

    public angle = 0;
    public selected = false;
    public dragged = false;

    constructor(
        public entityId: number,
        public x: number,
        public y: number,
        public w: number = 10,
        public h: number = 10
    ) {
        this.x = x;
        this.y = y;
    }

    createDom(): this {
        this.dom = document.createElement('div');
        (this.dom as any).parentPiece = this;
        this.dom.classList.add('piece');
        this.dom.style.width = `${this.w}px`;
        this.dom.style.height = `${this.h}px`;
        this.dom.style.transformOrigin = `center`;
        this.dom.style.transform = `translate(${this.x}px, ${this.y}px)`;
        // this.dom.style.left = `${this.x - this.w / 2}px`;
        // this.dom.style.top = `${this.y - this.h / 2}px`;
        return this;
    }

    updateTransform(x: number, y: number, angle: number): this {
        // console.log('updateTransform', x, y, angle);

        this.x = x;
        this.y = y;
        this.angle = angle;
        if (!this.dom) return this;
        this.dom.style.transform = `translate(${this.x - this.w / 2}px, ${this.y - this.h / 2}px) rotate(${this.angle}deg)`;
        // this.dom.style.left = `${this.x - this.w / 2}px`;
        // this.dom.style.top = `${this.y - this.h / 2}px`;
        return this;
    }

    onMouseDown() {

    }
    onDrag() {

    }
    onMouseUp() {

    }

    createPhysics(physicsSystem: PhysicsSystem<Piece>, bodyCreatedCallback?: () => void): this {

        const { fixtureDef, bodyDef } = getPhysicsDefinitions(this.w * PIXEL_TO_METER, this.h * PIXEL_TO_METER);


        fixtureDef.userData = {
            fixtureLabel: 'piece',
        } as IFixtureUserData;

        bodyDef.userData = {
            label: 'piece',
            gameObject: this,
        };

        physicsSystem.scheduleCreateBody(() => {
            this.b2Body = physicsSystem.world.CreateBody(bodyDef);
            this.b2Body.CreateFixture(fixtureDef); // a body can have multiple fixtures
            this.b2Body.SetPosition({ x: this.x * PIXEL_TO_METER, y: this.y * PIXEL_TO_METER });
            bodyCreatedCallback?.();
        });
        return this;
    }

    destroyPhysics(physicsSystem: PhysicsSystem<Piece>): this {
        if (!this.b2Body) return this;
        console.log('destroyPhysics', this.entityId);

        physicsSystem.scheduleDestroyBody(this.b2Body);
        return this;
    }

    bringToTop(): this {
        this.dom?.parentNode!.appendChild(this.dom);
        return this;
    }

    toggleSelected(val = !this.selected): this {
        this.selected = val;

        this.dom?.classList.toggle('selected', this.selected);
        return this;
    }

    toggleDragged(val = !this.dragged): this {
        this.dragged = val;

        this.dom?.classList.toggle('dragged', this.dragged);
        return this;
    }

    onClick() {
        if (!this.selected) return this.toggleSelected(true);
        return this.action();
    }

    action(): this {
        console.log('Action');
        return this;
    }



    static appendPieceTo(parent: Element, piece: Piece) {
        if (!piece.dom) {
            console.warn(`Piece doesn't have dom!`);
            return;
        }
        parent.appendChild(piece.dom);
    }
}
