<script>

export default {
  name: 'SysRole',
  data() {
    return {
      listLoading: true, // 数据是否正在加载
      list: [], // 角色列表
      total: 0, // 总记录数
      pageNum: 1, // 页码
      pageSize: 10, // 每页记录数
      roleName: '',
      dialogVisible: false,
      sysRole: {
        roleName: '',
        roleCode: '',
        description: ''
      },
      multipleSelection: []// 批量删除选中的记录列表
    }
  },

  created() {
    this.fetchList()
  },
  methods: {
    // 当多选选项发生变化的时候调用
    handleSelectionChange(selection) {
      console.log(selection)
      this.multipleSelection = selection
    },
    resetData() {
      this.roleName = ''
      this.fetchList()
    },
    async fetchList() {
      this.listLoading = true
      const params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        roleName: this.roleName
      }
      const { records, total } = await this.$store.dispatch('sysRole/getList', params)
      console.log(records)
      this.total = total
      this.list = records
      this.listLoading = false
    },
    // 根据id删除数据
    removeDataById(data) {
      // debugger
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => { // promise
        // 点击确定，远程调用ajax
        return this.$store.dispatch('sysRole/removeById', data)
      }).then((response) => {
        this.fetchList()
        this.$message.success(response.message || '删除成功')
      }).catch((e) => {
        console.log(e)
        this.$message.info('取消删除')
      })
    },
    addHandler() {
      this.sysRole = {}
      this.dialogVisible = true
    },
    saveHandler() {
      if (this.sysRole.id) {
        this.$store.dispatch('sysRole/updateRole', this.sysRole).then((res) => {
          this.$message.success(res.message || '操作成功')
          this.dialogVisible = false
          this.fetchList()
        })
      } else {
        this.$store.dispatch('sysRole/addRole', this.sysRole).then((res) => {
          this.$message.success(res.message || '操作成功')
          this.dialogVisible = false
          this.fetchList()
        })
      }
    },
    editHandler(row) {
      this.sysRole = Object.assign({}, row)
      this.dialogVisible = true
    },
    // 批量删除
    batchRemove() {
      if (this.multipleSelection.length === 0) {
        this.$message.warning('请选择要删除的记录！')
        return
      }
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 点击确定，远程调用ajax
        // 遍历selection，将id取出放入id列表
        const idList = []
        this.multipleSelection.forEach(item => {
          idList.push(item.id)
        })
        // 调用api
        return this.$store.dispatch('sysRole/batchDelete', { ids: idList })
      }).then((response) => {
        this.fetchList()
        this.$message.success(response.message)
      }).catch(error => {
        if (error === 'cancel') {
          this.$message.info('取消删除')
        }
      })
    }
  }
}
</script>

<template>
  <div class="app-container">
    <!--查询表单-->
    <div class="search-div">
      <el-form label-width="70px" size="small">
        <el-row>
          <el-col :span="24">
            <el-form-item label="角色名称">
              <el-input v-model="roleName" style="width: 100%" placeholder="角色名称" @keyup.enter="fetchList()" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="display:flex">
          <el-button type="primary" icon="el-icon-search" size="mini" @click="fetchList()">搜索</el-button>
          <el-button icon="el-icon-refresh" size="mini" @click="resetData">重置</el-button>
        </el-row>
      </el-form>
    </div>

    <!-- 工具条 -->
    <div class="tools-div">
      <el-button type="success" icon="el-icon-plus" size="mini" @click="addHandler">添 加</el-button>
      <el-button class="btn-add" size="mini" @click="batchRemove()">批量删除</el-button>
    </div>

    <!-- 表格 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      stripe
      border
      style="width: 100%;margin-top: 10px;"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" />
      <el-table-column
        label="序号"
        width="70"
        align="center"
      >
        <template slot-scope="scope">
          {{ (pageNum - 1) * pageSize + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="roleName" label="角色名称" />
      <el-table-column prop="roleCode" label="角色编码" />
      <el-table-column prop="createTime" label="创建时间" width="160" />
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" title="修改" @click="editHandler(scope.row)" />
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            title="删除"
            @click="removeDataById(scope.row)"
          />
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <el-pagination
      :current-page="pageNum"
      :total="total"
      :page-size="pageSize"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="fetchList"
    />

    <el-dialog title="添加/修改" :visible.sync="dialogVisible" width="40%">
      <el-form ref="dataForm" :model="sysRole" label-width="150px" size="small" style="padding-right: 40px;">
        <el-form-item label="角色名称">
          <el-input v-model="sysRole.roleName" />
        </el-form-item>
        <el-form-item label="角色编码">
          <el-input v-model="sysRole.roleCode" />
        </el-form-item>
        <el-form-item label="简介">
          <el-input v-model="sysRole.description" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" icon="el-icon-refresh-right" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" icon="el-icon-check" size="small" @click="saveHandler()">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<style scoped lang="scss">

</style>
