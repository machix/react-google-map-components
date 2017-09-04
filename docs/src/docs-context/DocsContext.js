import kebabCase from "lodash/kebabCase";

export class DocsPage {
  constructor(name, render, parentUrl) {
    this.name = name;
    this.render = render;
    this.url = [parentUrl, kebabCase(name)].join("/");
  }
}

export class DocsSection {
  constructor(name) {
    this.name = name;
    this.url = `/${kebabCase(name)}`;

    this.pages = [];
  }

  addPage(name, render): DocsSection {
    this.pages.push(new DocsPage(name, render, this.url));

    return this;
  }
}

export class DocsContext {
  constructor() {
    this.sections = [];
  }

  addSection(name): DocsSection {
    const section = new DocsSection(name);

    this.sections.push(section);

    return section;
  }
}
