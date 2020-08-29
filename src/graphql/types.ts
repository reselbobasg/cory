import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
export class CapabilityQL {
  @Field(type => String)
  id: string;

  @Field()
  description: string;

  @Field(type => String)
  capabilityType: string;

  @Field(type => String)
  createdAt: string;
}