import { ObjectType } from "@nestjs/graphql";
import PaginatedResponse from "../../common/pagination/pagination";
import { Transaction } from "./transaction.model";

@ObjectType()
export class TransactionConnection extends PaginatedResponse(Transaction) {}
