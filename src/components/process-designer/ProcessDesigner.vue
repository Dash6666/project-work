<template>
  <div class="designer">
    <div class="canvas" ref="canvas">
      <task-properties-panel
        v-if="bpmnModeler"
        :modeler="bpmnModeler"
      ></task-properties-panel>
    </div>
  </div>
</template>

<script>
import CustomModeler from "./modeler/modeler.js";
import TaskPropertiesPanel from "./TaskPropertiesPanel.vue";
import "./modeler/style/bpmnElement.css";
export default {
  name: "ProcessDesigner",
  data() {
    return {
      bpmnModeler: null,
      canvas: null,
    };
  },
  components: {
    TaskPropertiesPanel,
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.container = this.$refs.container;
      const canvas = this.$refs.canvas;
      this.bpmnModeler = new CustomModeler({
        container: canvas,
      });
      this.bpmnModeler.createDiagram();
    },
    addEventBusListener() {
      let that = this;
      const eventBus = this.bpmnModeler.get("eventBus");
      const elementRegistry = this.bpmnModeler.get("elementRegistry");
      const eventTypes = ["element.click", "element.changed"];
    },
  },
};
</script>

<style>
.designers {
  background-image: url("../../assets/pdbg.png");
}
.canvas {
  position: relative;
  height: 600px;
}
</style>
