import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Logger, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { PrismaModule, loggingMiddleware } from "nestjs-prisma";
import { AppController } from "./app.controller";
import { AppResolver } from "./app.resolver";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import config from "./common/configs/config";
import { GqlConfigService } from "./gql-config.service";
import { TransactionsModule } from "./transactions/transactions.module";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        middlewares: [
          loggingMiddleware({
            logger: new Logger("PrismaMiddleware"),
            logLevel: "log"
          })
        ]
      }
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useClass: GqlConfigService
    }),
    AuthModule,
    UsersModule,
    TransactionsModule
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver]
})
export class AppModule {}
