"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Candidate = void 0;
var Candidate = /** @class */ (function () {
    function Candidate(data) {
        this.id = data.id;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.email = data.email;
        this.phone = data.phone;
        this.address = data.address;
        this.education = data.education;
        this.experience = data.experience;
        this.resumePath = data.resumePath;
    }
    return Candidate;
}());
exports.Candidate = Candidate;
