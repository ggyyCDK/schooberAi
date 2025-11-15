"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AggregateRoot = void 0;
const EntityBase_1 = require("./EntityBase");
class AggregateRoot extends EntityBase_1.EntityBase {
    // private domainEvents: unknown[] = [];
    addDomainEvent(event) {
        throw new Error('Need implemented');
    }
    removeDomainEvent(event) {
        throw new Error('Need implemented');
    }
    clearDomainEvents() {
        // this.domainEvents = [];
    }
}
exports.AggregateRoot = AggregateRoot;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWdncmVnYXRlUm9vdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvU2hhcmVkL1NlZWRXb3JrL0FnZ3JlZ2F0ZVJvb3RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDZDQUEwQztBQUUxQyxNQUFzQixhQUFjLFNBQVEsdUJBQVU7SUFFbEQsd0NBQXdDO0lBRTlCLGNBQWMsQ0FBQyxLQUFjO1FBQ25DLE1BQU0sSUFBSSxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRVMsaUJBQWlCLENBQUMsS0FBYztRQUN0QyxNQUFNLElBQUksS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVTLGlCQUFpQjtRQUN2QiwwQkFBMEI7SUFDOUIsQ0FBQztDQUNKO0FBZkQsc0NBZUMifQ==