import {IEntity} from "@smartsoft001/domain-core";
import {Field, Model} from "@smartsoft001/models";

@Model({})
export class <%= classify(domainName) %> IEntity<string> {
    id: string;
}