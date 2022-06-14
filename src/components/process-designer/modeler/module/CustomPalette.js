export default class CustomPalette {
  constructor(bpmnFactory, create, elementFactory, palette, translate) {
    this.bpmnFactory = bpmnFactory;
    this.create = create;
    this.elementFactory = elementFactory;
    this.translate = translate;

    palette.registerProvider(this);
  }

  getPaletteEntries() {
    const { bpmnFactory, create, elementFactory, translate } = this;

    function createBPMN(type) {
      const p = new Object();
      p.type = type;
      if (type === "bpmn:SubProcess") {
        p.x = 0;
        p.y = 0;
        p.isExpanded = true;
      }
      return function (event) {
        const shape = elementFactory.createShape(p);
        create.start(event, shape);
      };
    }

    function createTask() {
      return function (event) {
        const p = new Object();
        p.type = "bpmn:Task";
        const shape = elementFactory.createShape(p);
        console.log(event);
        create.start(event, shape);
      };
    }
    function createStartEvent() {
      const type = "bpmn:StartEvent";
      return createBPMN(type);
    }
    function createEndEvent() {
      return createBPMN("bpmn:EndEvent");
    }
    function createParallelGateway() {
      return createBPMN("bpmn:ParallelGateway");
    }
    function createSubprocess(event) {
      var subProcess = elementFactory.createShape({
        type: "bpmn:SubProcess",
        x: 0,
        y: 0,
        isExpanded: true,
      });

      var startEvent = elementFactory.createShape({
        type: "bpmn:StartEvent",
        x: 40,
        y: 82,
        parent: subProcess,
      });

      create.start(event, [subProcess, startEvent], {
        hints: {
          autoSelect: [subProcess],
        },
      });
    }

    return {
      "create.task": {
        group: "activity",
        className: "BPMN-icon BPMN-icon-task",
        title: translate("新建一个任务"),
        action: {
          dragstart: createTask(),
          click: createTask(),
        },
      },
      "create.start-event": {
        group: "event",
        className: "BPMN-icon BPMN-icon-start-event",
        title: translate("新建一个流程起点"),
        action: {
          dragstart: createStartEvent(),
          click: createStartEvent(),
        },
      },
      "create.end-event": {
        group: "event",
        className: "BPMN-icon BPMN-icon-end-event",
        title: translate("新建一个流程终点"),
        action: {
          dragstart: createEndEvent(),
          click: createEndEvent(),
        },
      },
      "create.subprocess-expanded": {
        group: "activity",
        className: "bpmn-icon-subprocess-expanded",
        title: translate("新建一个扩展子流程"),
        action: {
          dragstart: createSubprocess,
          click: createSubprocess,
        },
      },
      "create.parallel-gateway": {
        group: "gateway",
        className: "bpmn-icon-gateway-parallel",
        title: translate("新建一个并行网关"),
        action: {
          dragstart: createParallelGateway(),
          click: createParallelGateway(),
        },
      },
    };
  }
}
