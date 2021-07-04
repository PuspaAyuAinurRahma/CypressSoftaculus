<style>
    .table-hot-price label {
        font-weight: normal;
        font-size: 12px;
    }
    .table-hot-price label b {
        color: #e91e63;
    }
</style>
<div class="panel">
    <div class="panel-heading">
        <div class="panel-title">
            <div class="row">
                <div class="col-md-6">
                    <h3>Config Role Order</h3>
                </div>
            </div>
        </div>
    </div>
    <div class="panel-body">
        <form id="setting-role-order">
            <div class="form-group">
                <label>Role</label>
                <select class="form-control" name="role"></select>
            </div>
            <div class="form-group">
                <label>From Billing Cycle</label>
                <select class="form-control" name="from_bc">
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="semiannually">Semiannually</option>
                    <option value="annually">Annually</option>
                    <option value="biennially">Biennially</option>
                    <option value="triennially">Triennially</option>
                </select>
            </div>
            <div class="form-group">
                <label>To Billing Cycle</label>
                <select class="form-control" name="to_bc">
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="semiannually">Semiannually</option>
                    <option value="annually">Annually</option>
                    <option value="biennially">Biennially</option>
                    <option value="triennially">Triennially</option>
                </select>
            </div>
            <div>
                <button class="btn btn-success">Submit</button>
            </div>
        </form>
    </div>
</div>