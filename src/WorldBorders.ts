import { b2FixtureDef, b2PolygonShape, b2BodyDef, b2BodyType, b2World, b2Vec2, b2Body } from "@flyover/box2d";
import { PIXEL_TO_METER, WORLD_HEIGHT, WORLD_WIDTH } from "./constants";
import { IFixtureUserData, PhysicsSystem } from "./PhysicsSystem";
import { collisionCategory } from "./utils/collisionCategory";

export class WorldBorders {
    b2Body?: b2Body;

    createBorderFixture(world: b2World, cx: number, cy: number, w: number, h: number) {

        // body shape definition. can have many
        const fixtureDef = new b2FixtureDef();

        // doesn't participate in collisions? need to check
        // fixtureDef.isSensor = false;

        // mass per volume
        fixtureDef.density = 1;

        // // friction against other solids?
        fixtureDef.friction = 0;

        // bounciness
        fixtureDef.restitution = 1;

        fixtureDef.shape = new b2PolygonShape();
        (fixtureDef.shape as b2PolygonShape).SetAsBox(
            w / 2 * PIXEL_TO_METER, h / 2 * PIXEL_TO_METER,
            { x: cx * PIXEL_TO_METER, y: cy * PIXEL_TO_METER },
        );

        // I am a...
        fixtureDef.filter.categoryBits = collisionCategory.WORLD;

        // I can collide with...
        fixtureDef.filter.maskBits = collisionCategory.PLAYER;
        return fixtureDef;

    }
    createPhysics(physicsSystem: PhysicsSystem<any>) {

        // body def defines the body (well...)
        const bodyDef = new b2BodyDef();

        // dynamic(moving), static(walls) or kinematic(moving walls)
        bodyDef.type = b2BodyType.b2_staticBody;

        // // sleeping disables physics when not moving.
        // // troublesome to wake it back though
        // bodyDef.allowSleep = false;

        this.b2Body = physicsSystem.world.CreateBody(bodyDef);


        const halfThickness = 16;
        // top
        this.b2Body.CreateFixture(this.createBorderFixture(physicsSystem.world,
            WORLD_WIDTH / 2,
            -halfThickness,
            WORLD_WIDTH,
            halfThickness * 2));
        // bottom
        this.b2Body.CreateFixture(this.createBorderFixture(physicsSystem.world,
            WORLD_WIDTH / 2,
            WORLD_HEIGHT + halfThickness,
            WORLD_WIDTH,
            halfThickness * 2));
        // left
        this.b2Body.CreateFixture(this.createBorderFixture(physicsSystem.world,
            -halfThickness,
            WORLD_HEIGHT / 2,
            halfThickness * 2,
            WORLD_HEIGHT));
        // right
        this.b2Body.CreateFixture(this.createBorderFixture(physicsSystem.world,
            WORLD_WIDTH + halfThickness,
            WORLD_HEIGHT / 2,
            halfThickness * 2,
            WORLD_HEIGHT));
        console.log('WorldBorders', this.b2Body);

    }
}