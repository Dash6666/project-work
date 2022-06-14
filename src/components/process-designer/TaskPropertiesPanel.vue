<template>
  <div class="panel">
    <div v-if="selectedElements.length == 1">
      <div class="panel-head">
        <div class="element-item">
          <label>id</label>
          <span>{{ element.id }}</span>
        </div>
        <div class="element-item">
          <label>name</label>
          <input
            :value="element.name"
            @change="(event) => changeField(event, 'name')"
          />
        </div>
      </div>
      <div class="assignee" v-if="needProperties">
        <div class="properties-title">
          <span class="fl">任务执行人</span>
          <el-dropdown class="fr" @command="handleCommand">
            <i class="icon-add">+</i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="(item, index) in teammates"
                :key="index"
                :command="item"
                >{{ item }}</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="properties-content">
          <a
            href="javascript:;"
            v-for="(item, index) in assignees"
            :key="index"
          >
            {{ item }}
          </a>
        </div>
      </div>
      <div class="check" v-if="needProperties">
        <div class="properties-title">
          <span class="fl">任务审核人</span>
          <el-dropdown class="fr">
            <i class="icon-add">+</i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>Albert</el-dropdown-item>
              <el-dropdown-item>Ben</el-dropdown-item>
              <el-dropdown-item>Cindy</el-dropdown-item>
              <el-dropdown-item>David</el-dropdown-item>
              <el-dropdown-item>Emmie</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="properties-content"></div>
      </div>
      <div class="p-form" v-if="needProperties">
        <div class="properties-title">
          <span class="fl">任务表单</span>
          <i class="icon-add fr">+</i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TaskPropertiesPanel",
  data() {
    return {
      selectedElements: [],
      element: null,
      teammates: ["Albert", "Ben", "Cindy"],
      assignees: [],
      reviewers: [],
      needProperties: true,
    };
  },
  props: {
    modeler: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    isEvent() {
      const { element } = this;
      return this.verifyIsEvent(element.type);
    },
    isTask() {
      const { element } = this;
      return this.verifyIsTask(element.type);
    },
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      const { modeler } = this;
      modeler.on("selection.changed", (e) => {
        this.selectedElements = e.newSelection;
        this.element = e.newSelection[0];
        this.setDefaultProperties();
      });
      modeler.on("element.changed", (e) => {
        const { element } = e;
        const { element: currentElement } = this;
        if (!currentElement) {
          return;
        }
        // update panel, if currently selected element changed
        if (element.id === currentElement.id) {
          this.element = element;
        }
      });
    },
    setDefaultProperties() {
      const { element } = this;
      // console.log(element);
      if (element) {
        const { type, businessObject } = element;
        const { name } = businessObject; //同const name = businessObject.name
        if (this.verifyIsEvent(type)) {
          this.eventType = businessObject.eventDefinitions
            ? businessObject.eventDefinitions[0]["$type"]
            : "";
          this.needProperties = false;
          // console.log(this.eventType);
        } else if (this.verifyIsTask(type)) {
          this.taskType = type;
          this.needProperties = true;
        }
        element["name"] = name;
      }
    },
    verifyIsEvent(type) {
      return type.includes("Event");
    },
    verifyIsTask(type) {
      return type.includes("Task");
    },
    updateName(name) {
      const { modeler, element } = this;
      const modeling = modeler.get("modeling");
      modeling.updateLabel(element, name);
    },
    changeField(event, type) {
      console.log(event);
      console.log(type);
      const value = event.target.value;
      this.element[type] = value;
      let properties = {};
      properties[type] = value;
      if (type === "color") {
        this.onChangeColor(value);
      }
      this.updateProperties(properties);
    },
    updateProperties(properties) {
      const { modeler, element } = this;
      const modeling = modeler.get("modeling");
      modeling.updateProperties(element, properties);
    },
    handleCommand(command) {
      // this.$message('click on item ' + command);
      this.assignees.push(command);
      const left = [];
      for (let i = 0; i < this.teammates.length; i++) {
        if (this.teammates[i] !== command) left.push(this.teammates[i]);
      }
      this.teammates = left;
    },
  },
};
</script>

<style lang="less">
.panel {
  position: absolute;
  box-sizing: border-box;
  right: 20px;
  top: 30px;
  width: 260px;
  height: 500px;
  padding: 10px 18px 20px 18px;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 1px 3px 3px #82868a;
  z-index: 2;
}

a {
  font-style: normal;
  text-decoration: none;
  color: #d4d4d4;
}

.element-item {
  display: flex;
  width: 220px;
  height: 25px;
  margin: 16px auto;
  font-size: 14px;
  line-height: 25px;
  input {
    width: 150px;
    border: 1px solid #d4d4d4;

    outline: none;
  }
  label {
    width: 36px;
    margin-right: 20px;
  }
}

.assignee,
.check {
  height: 150px;
}

.properties-title {
  height: 30px;
}

.properties-content {
  text-align: left;
  padding: 6px;
}

.fl {
  float: left;
}
.fr {
  float: right;
}
.flexbox {
  display: flex;
}
.icon-add {
  font-size: 24px;
  color: #05dfff;
  font-style: normal;
}
</style>
