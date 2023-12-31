import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver
} from "@nestjs/graphql";
import { User } from "../users/models/user.model";
import { AuthService } from "./auth.service";
import { LoginInput } from "./dto/login.input";
import { RefreshTokenInput } from "./dto/refresh-token.input";
import { SignupInput } from "./dto/signup.input";
import { Auth } from "./models/auth.model";
import { Token } from "./models/token.model";

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly auth: AuthService) {}

  @Mutation(() => Auth)
  async signUp(@Args("data") data: SignupInput) {
    data.email = data.email.toLowerCase();
    const { accessToken, refreshToken } = await this.auth.createUser(data);
    return {
      accessToken,
      refreshToken
    };
  }

  @Mutation(() => Auth)
  async signIn(@Args("data") { email, password }: LoginInput) {
    const { accessToken, refreshToken } = await this.auth.login(
      email.toLowerCase(),
      password
    );
    return {
      accessToken,
      refreshToken
    };
  }

  @Mutation(() => Token)
  async refreshToken(@Args() { token }: RefreshTokenInput) {
    return this.auth.refreshToken(token);
  }

  @ResolveField("user", () => User)
  async user(@Parent() auth: Auth) {
    return await this.auth.getUserFromToken(auth.accessToken);
  }
}
