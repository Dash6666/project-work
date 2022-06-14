import inherits from "inherits";
import BaseRenderer from "diagram-js/lib/draw/BaseRenderer";
import { append as svgAppend, create as svgCreate } from "tiny-svg";

import {
  customElements,
  customConfig,
  hasLabelElements,
} from "../utils/util.js";

export default function CustomRenderer(eventBus) {
  BaseRenderer.call(this, eventBus, 2000);
  const that = this;

  this.drawCustomElements = function (parentNode, element) {
    const type = element.type;
    // if (customElements.includes(type)) {

    // }
    const { url, attr } = customConfig[type];
    const customIcon = svgCreate("image", {
      ...attr,
      href: url,
    });
    element["width"] = attr.width;
    element["height"] = attr.height;
    svgAppend(parentNode, customIcon);
    //加label
    if (!hasLabelElements.includes(type) && element.businessObject.name) {
      const text = svgCreate("text", {
        x: attr.x,
        y: attr.y + attr.height + 20,
        "font-size": "14",
        fill: "#000",
      });
      text.innerHTML = element.businessObject.name;
      svgAppend(parentNode, text);
      console.log(text);
    }
    return customIcon;
  };
}

inherits(CustomRenderer, BaseRenderer);

CustomRenderer.prototype.drawShape = function (p, element) {
  if (customElements.includes(element.type)) {
    return this.drawCustomElements(p, element);
  }
};

CustomRenderer.$inject = ["eventBus", "styles"];

CustomRenderer.prototype.canRender = function (element) {
  // ignore labels
  return !element.labelTarget;
};

//here

CustomRenderer.prototype.getShapePath = function (shape) {
  // console.log(shape);
};
