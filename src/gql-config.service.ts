import { ApolloDriverConfig } from "@nestjs/apollo";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { GqlOptionsFactory } from "@nestjs/graphql";
import { GraphqlConfig } from "./common/configs/config.interface";

@Injectable()
export class GqlConfigService implements GqlOptionsFactory {
  constructor(private configService: ConfigService) {}
  createGqlOptions(): ApolloDriverConfig {
    const graphqlConfig = this.configService.get<GraphqlConfig>("graphql");
    return {
      // Schema options
      autoSchemaFile: graphqlConfig.schemaDestination || "./src/schema.graphql",
      sortSchema: graphqlConfig.sortSchema,
      buildSchemaOptions: {
        numberScalarMode: "integer"
      },
      // Subscription
      installSubscriptionHandlers: true,
      includeStacktraceInErrorResponses: graphqlConfig.debug,
      playground: graphqlConfig.playgroundEnabled,
      context: ({ req }) => ({ req })
    };
  }
}
