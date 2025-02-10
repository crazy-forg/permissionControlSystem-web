<script>
const defaultForm = {
  id: '',
  username: '',
  password: '',
  name: '',
  phone: '',
  status: 1
}
export default {
  name: 'SysRole',
  data() {
    return {
      listLoading: true, // 数据是否正在加载
      list: [], // 角色列表
      total: 0, // 总记录数
      pageNum: 1, // 页码
      pageSize: 10, // 每页记录数
      keyword: '',
      dialogVisible: false,
      dialogRoleVisible: false,
      sysUser: defaultForm,
      createTimes: [],
      multipleSelection: [], // 批量删除选中的记录列表
      allRoles: [], // 所有角色列表
      userRoleIds: [], // 用户的角色ID的列表
      isIndeterminate: false, // 是否是不确定的
      checkAll: false // 是否全选
    }
  },

  created() {
    this.fetchList()
  },
  methods: {
    // 展示分配角色
    async showAssignRole(row) {
      this.sysUser = row

      const { data } = await this.$store.dispatch('sysRole/getRoleByUserId', row.id)

      this.dialogRoleVisible = true
      this.allRoles = data.allRoles
      this.userRoleIds = data.roleIds
      this.checkAll = this.userRoleIds.length === this.allRoles.length
      this.isIndeterminate = this.userRoleIds.length > 0 && this.userRoleIds.length < this.allRoles.length
    },
    // 当多选选项发生变化的时候调用
    handleSelectionChange(selection) {
      console.log(selection)
      this.multipleSelection = selection
    },
    resetData() {
      this.keyword = ''
      this.createTimes = []
      this.fetchList()
    },
    async fetchList() {
      this.listLoading = true
      const params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        keyword: this.keyword,
        createTimeBegin: this.createTimes[0],
        createTimeEnd: this.createTimes[1]
      }
      const { records, total } = await this.$store.dispatch('sysUser/getList', params)
      this.total = total
      this.list = records
      this.listLoading = false
    },
    // 根据id删除数据
    removeDataById(id) {
      // debugger
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => { // promise
        // 点击确定，远程调用ajax
        return this.$store.dispatch('sysUser/removeById', { id })
      }).then((response) => {
        this.fetchList()
        this.$message.success(response.message || '删除成功')
      }).catch((e) => {
        console.log(e)
        this.$message.info('取消删除')
      })
    },
    addHandler() {
      this.sysUser = {}
      this.dialogVisible = true
    },
    switchStatus(row) {
      this.sysUser = Object.assign({}, row)
      this.$store.dispatch('sysUser/updateUser', this.sysUser).then((res) => {
        this.$message.success(res.message || '操作成功')
        this.dialogVisible = false
        this.fetchList()
      })
    },
    saveHandler() {
      if (this.sysUser.id) {
        this.$store.dispatch('sysUser/updateUser', this.sysUser).then((res) => {
          this.$message.success(res.message || '操作成功')
          this.dialogVisible = false
          this.fetchList()
        })
      } else {
        this.$store.dispatch('sysUser/addUser', this.sysUser).then((res) => {
          this.$message.success(res.message || '操作成功')
          this.dialogVisible = false
          this.fetchList()
        })
      }
    },
    async editHandler(row) {
      console.log(row)
      this.$store.dispatch('sysUser/getUserById', row).then((res) => {
        this.sysUser = res
        console.log(this.sysUser)
        this.dialogVisible = true
      })
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
    },
    /*
    全选勾选状态发生改变的监听
    */
    handleCheckAllChange(value) { // value 当前勾选状态true/false
      // 如果当前全选, userRoleIds就是所有角色id的数组, 否则是空数组
      this.userRoleIds = value ? this.allRoles.map(item => item.id) : []
      // 如果当前不是全选也不全不选时, 指定为false
      this.isIndeterminate = false
    },
    /*
   角色列表选中项发生改变的监听
   */
    handleCheckedChange(value) {
      const { userRoleIds, allRoles } = this
      this.checkAll = userRoleIds.length === allRoles.length && allRoles.length > 0
      this.isIndeterminate = userRoleIds.length > 0 && userRoleIds.length < allRoles.length
    },
    // 分配角色
    async assignRole() {
      const assginRoleVo = {
        userId: this.sysUser.id,
        roleIdList: this.userRoleIds
      }

      await this.$store.dispatch('sysRole/assignRoles', assginRoleVo)

      this.$message.success('分配角色成功')
      this.dialogRoleVisible = false
      await this.fetchList()
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
          <el-col :span="8">
            <el-form-item label="关 键 字">
              <el-input v-model="keyword" style="width: 95%" placeholder="用户名/姓名/手机号码" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="操作时间">
              <el-date-picker
                v-model="createTimes"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                value-format="yyyy-MM-dd HH:mm:ss"
                style="margin-right: 10px;width: 100%;"
              />
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
    </div>

    <!-- 表格 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      stripe
      border
      style="width: 100%;margin-top: 10px;"
    >
      <el-table-column
        type="index"
        label="序号"
        width="70"
        align="center"
      />

      <el-table-column prop="username" label="用户名" width="180" />
      <el-table-column prop="name" label="姓名" width="110" />
      <el-table-column prop="phone" label="手机" />
      <el-table-column label="状态" width="80">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            :active-value="1"
            :inactive-value="0"
            @change="switchStatus(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" />

      <el-table-column label="操作" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" title="修改" @click="editHandler(scope.row)" />
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            title="删除"
            @click="removeDataById(scope.row.id)"
          />
          <el-button
            type="warning"
            icon="el-icon-baseball"
            size="mini"
            title="分配角色"
            @click="showAssignRole(scope.row)"
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
      <el-form ref="dataForm" :model="sysUser" label-width="100px" size="small" style="padding-right: 40px;">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="sysUser.username" />
        </el-form-item>
        <el-form-item v-if="!sysUser.id" label="密码" prop="password">
          <el-input v-model="sysUser.password" type="password" />
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="sysUser.name" />
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input v-model="sysUser.phone" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" icon="el-icon-refresh-right" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" icon="el-icon-check" size="small" @click="saveHandler()">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="分配角色" :visible.sync="dialogRoleVisible">
      <el-form label-width="80px">
        <el-form-item label="用户名">
          <el-input disabled :value="sysUser.username" />
        </el-form-item>

        <el-form-item label="角色列表">
          <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">全选
          </el-checkbox>
          <div style="margin: 15px 0;" />
          <el-checkbox-group v-model="userRoleIds" @change="handleCheckedChange">
            <el-checkbox v-for="role in allRoles" :key="role.id" :label="role.id">{{ role.roleName }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" size="small" @click="assignRole">保存</el-button>
        <el-button size="small" @click="dialogRoleVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<style scoped lang="scss">

</style>
