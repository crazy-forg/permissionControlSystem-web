<template>
  <div class="app-container">

    <!--     工具条-->
    <div class="tools-div">
      <el-button type="success" icon="el-icon-plus" size="mini" @click="add()">添 加</el-button>
    </div>
    <el-table
      :data="sysDeptList"
      style="width: 100%;margin-bottom: 20px;margin-top: 10px;"
      row-key="id"
      border
      :default-expand-all="false"
      :tree-props="{children: 'children'}"
    >

      <el-table-column prop="name" label="部门名称" />
      <el-table-column prop="leader" label="部门负责人" width="160" />
      <el-table-column prop="phone" label="部门电话" width="160" />
      <el-table-column label="状态" width="80">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            :active-value="1"
            :inactive-value="0"
            :disabled="true"
          />
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="160" />
      <el-table-column label="操作" width="180" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.type !== 2"
            type="success"
            icon="el-icon-plus"
            size="mini"
            title="添加下级节点"
            @click="add(scope.row)"
          />
          <el-button type="primary" icon="el-icon-edit" size="mini" title="修改" @click="edit(scope.row)" />
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            title="删除"
            :disabled="scope.row.children.length > 0 ||sysDeptList.length === 1"
            @click="removeDataById(scope.row.id)"
          />
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="40%">
      <el-form ref="dataForm" :model="sysDept" label-width="150px" size="small" style="padding-right: 40px;">
        <el-form-item label="部门名称" prop="name">
          <el-input v-model="sysDept.name" />
        </el-form-item>
        <el-form-item label="部门负责人" prop="name">
          <el-input v-model="sysDept.leader" />
        </el-form-item>
        <el-form-item label="部门电话" prop="name">
          <el-input v-model="sysDept.phone" />
        </el-form-item>

        <el-form-item label="排序">
          <el-input-number v-model="sysDept.sortValue" controls-position="right" :min="0" />
        </el-form-item>
        <el-form-item label="状态" prop="type">
          <el-radio-group v-model="sysDept.status">
            <el-radio :label="1">正常</el-radio>
            <el-radio :label="0">停用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" icon="el-icon-refresh-right" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" icon="el-icon-check" size="small" @click="saveOrUpdate()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

const defaultForm = {
  name: '',
  parentId: 0,
  leader: '',
  phone: '',
  status: 1,
  sortValue: 1
}
export default {
  // 定义数据
  data() {
    return {
      sysDeptList: [],
      expandKeys: [], // 需要自动展开的项

      typeDisabled: false,
      type0Disabled: false,
      type1Disabled: false,
      type2Disabled: false,
      dialogTitle: '',

      dialogVisible: false,
      sysDept: defaultForm,
      saveBtnDisabled: false,

      iconList: [
        {
          class: 'el-icon-s-tools'
        },
        {
          class: 'el-icon-s-custom'
        },
        {
          class: 'el-icon-setting'
        },
        {
          class: 'el-icon-user-solid'
        },
        {
          class: 'el-icon-s-help'
        },
        {
          class: 'el-icon-phone'
        },
        {
          class: 'el-icon-s-unfold'
        },
        {
          class: 'el-icon-s-operation'
        },
        {
          class: 'el-icon-more-outline'
        },
        {
          class: 'el-icon-s-check'
        },
        {
          class: 'el-icon-tickets'
        },
        {
          class: 'el-icon-s-goods'
        },
        {
          class: 'el-icon-document-remove'
        },
        {
          class: 'el-icon-warning'
        },
        {
          class: 'el-icon-warning-outline'
        },
        {
          class: 'el-icon-question'
        },
        {
          class: 'el-icon-info'
        }
      ]
    }
  },

  // 当页面加载时获取数据
  created() {
    this.fetchData()
  },

  methods: {
    // 调用api层获取数据库中的数据
    fetchData() {
      console.log('加载列表')

      this.$store.dispatch('sysDept/getDepts', this.sysDept).then(response => {
        this.sysDeptList = response
        console.log(this.sysDeptList)
      })
    },

    // 根据id删除数据
    removeDataById(id) {
      // debugger
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => { // promiseremoveById
        // 点击确定，远程调用ajax
        return await this.$store.dispatch('sysDept/removeById', id)
      }).then((response) => {
        this.fetchData()
        this.$message({
          type: 'success',
          message: '成功'
        })
      }).catch(() => {
        this.$message.info('取消删除')
      })
    },

    // 弹出添加或更新的表单
    add(row) {
      debugger
      this.typeDisabled = false
      this.dialogTitle = '添加下级部门'
      this.dialogVisible = true

      this.sysDept = Object.assign({}, defaultForm)
      this.sysDept.id = ''
      if (row) {
        this.sysDept.parentId = row.id
      } else {
        this.dialogTitle = '添加新部门节点'
        this.typeDisabled = true
      }
    },

    // 编辑
    edit(row) {
      debugger
      this.dialogTitle = '修改菜单'
      this.dialogVisible = true

      this.sysDept = Object.assign({}, row)
      this.typeDisabled = true
    },

    // 添加或更新
    saveOrUpdate() {

      this.$refs.dataForm.validate(valid => {
        if (valid) {
          this.saveBtnDisabled = true // 防止表单重复提交
          if (!this.sysDept.id) {
            this.save()
          } else {
            this.update()
          }
        }
      })
    },

    // 添加
    save() {
      this.$store.dispatch('sysDept/addDept', this.sysDept).then(response => {
        this.$message.success('操作成功')
        this.dialogVisible = false
        this.fetchData(this.page)
      })
    },

    // 更新
    update() {
      this.$store.dispatch('sysDept/updateDept', this.sysDept).then(response => {
        this.$message.success('操作成功')
        this.dialogVisible = false
        this.fetchData()
      })
    }
  }
}
</script>
