const customElements = ["bpmn:Task", "bpmn:EndEvent", "bpmn:StartEvent"];
const hasLabelElements = [];
const customConfig = {
  "bpmn:StartEvent": {
    url: require("@/assets/start-event.png"),
    attr: { x: 0, y: 0, width: 50, height: 50 },
  },
  "bpmn:Task": {
    url: require("@/assets/bpmnTask.png"),
    attr: { x: 0, y: 0, width: 50, height: 50 }, //36
  },
  "bpmn:EndEvent": {
    url: require("@/assets/end-event.png"),
    attr: { x: 0, y: 0, width: 50, height: 50 },
  },
};
export { customElements, hasLabelElements, customConfig };
