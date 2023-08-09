import { Arg, Field, ObjectType, Query, Resolver } from "type-graphql";

@ObjectType()
class Recipe {
  @Field((type) => String)
  id: string;
}

@Resolver()
export class TestResolver {
  constructor() {}

  @Query(() => Recipe)
  async recipe(@Arg("id") id?: string) {
    console.log("id", id);

    return id;
  }
}
