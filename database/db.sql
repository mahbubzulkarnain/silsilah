CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE GENDER AS ENUM ('MAN', 'WOMEN');

CREATE TABLE IF NOT EXISTS "people" (
    "id" UUID PRIMARY KEY NOT NULL DEFAULT UUID_GENERATE_V4(),
    "sure_name" VARCHAR(64) NOT NULL,
    "nick_name" VARCHAR(64) DEFAULT '-',
    "gender" GENDER,
    "date_of_birth" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    "date_of_death" TIMESTAMP WITH TIME ZONE,
    "address" TEXT DEFAULT '-',
    "phone" VARCHAR(20) DEFAULT '-',
    "email" VARCHAR(64) DEFAULT '-',
    "blood_type" VARCHAR(5) DEFAULT '-',
    "profile_picture" VARCHAR(512),
    "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMP WITH TIME ZONE
);

CREATE TABLE IF NOT EXISTS "couple" (
    "id" UUID PRIMARY KEY NOT NULL DEFAULT UUID_GENERATE_V4(),
    "husband_id" UUID NOT NULL REFERENCES "people"(id),
    "wife_id" UUID NOT NULL REFERENCES "people"(id),
    "date_of_marriage" TIMESTAMP WITH TIME ZONE,
    "date_of_divorce" TIMESTAMP WITH TIME ZONE,
    "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMP WITH TIME ZONE
);

CREATE UNIQUE INDEX IF NOT EXISTS "couple_wife" ON "couple" ("wife_id") WHERE "date_of_divorce" IS NULL;
CREATE UNIQUE INDEX IF NOT EXISTS "couple_husband_wife" ON "couple" ("husband_id", "wife_id");

CREATE TABLE IF NOT EXISTS "children" (
    "id" UUID PRIMARY KEY NOT NULL DEFAULT UUID_GENERATE_V4(),
    "parent_id" UUID REFERENCES "couple"(id),
    "child_id" UUID REFERENCES "people"(id)
);

CREATE UNIQUE INDEX IF NOT EXISTS "children_child" ON "children" ("child_id");
CREATE UNIQUE INDEX IF NOT EXISTS "children_parent_child" ON "children" ("parent_id", "child_id");
