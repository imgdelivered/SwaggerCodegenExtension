
export class APISpecification {
    apispec: APISpec[];

    constructor(spec: APISpec[]) {
        this.apispec = spec;
    }
}

export class APISpec {
    uri: string;
    path: string;

    constructor(uri: string, path: string) {
        this.uri = uri;
        this.path = path;
    }
}

export class Guid {
    static newGuid() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
          v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }
  }