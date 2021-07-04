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
                    <h3>Configuration</h3>
                </div>
            </div>
        </div>
    </div>
    <div class="panel-body">
            <?php
            foreach($product_groups as $kg => $vg) {
                echo "
                    <div class='row'>
                        <div class='col-md-12'>
                        <h4>{$vg->name}</h4>
                        <form method='POST'>
                        <input type='hidden' name='group' value='{$vg->id}' />
                        <table class='table table-hot-price'>
                            <thead><tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Highlight</th>
                            <th>Harga Coret</th>
                            <th>Monthly Price (per Monthly)</th>
                            <th>Quarterly Price (per Monthly)</th>
                            <th>Semi Annually Price (per Monthly)</th>
                            <th>Annually Price (per Monthly)</th>
                            <th>Biennially Price (per Monthly)</th>
                            <th>Triennially Price (per Monthly)</th>
                            </tr></thead>";
                foreach($products as $kp => $vp) {
                    if($vp->gid == $vg->id) {
                        $checked_highlight = "";
                        foreach($vg->highlight as $kgh => $vgh) {
                            if($vgh->pid == $vp->id) {
                                $checked_highlight = "checked='checked'";
                                break;
                            }
                        }
                        ?>
                        <tr>
                            <td>#<?=$vp->id?></td>
                            <td><?=$vp->name?></td>
                            <td><input type="checkbox" name="highlight[<?=$vp->id?>]" value="<?=$vp->gid?>" <?=$checked_highlight?> /></td>
                            <td><input type="text" name="hot_price[<?=$vp->id?>]" value="<?=$vp->hot_price?>" style="width: 100px;" /></td>
                            <td>
                                <input type="radio" id="selected_price_<?=$vp->id?>_monthly" name="selected_price[<?=$vp->id?>]" value="monthly" <?=($vp->selected_price=="monthly") ? 'checked="checked"' : '' ?> />
                                <br/>
                                <label for="selected_price_<?=$vp->id?>_monthly">
                                    <?="Rp " . number_format($vp->monthly,2,',','.')?><br/>
                                    <b><?="Rp " . number_format(($vp->monthly/12),2,',','.')?></b>
                                </label>
                            </td>
                            <td>
                                <input type="radio" id="selected_price_<?=$vp->id?>_quarterly" name="selected_price[<?=$vp->id?>]" value="quarterly" <?=($vp->selected_price=="quarterly") ? 'checked="checked"' : '' ?> />
                                <br/>
                                <label for="selected_price_<?=$vp->id?>_quarterly">
                                    <?="Rp " . number_format($vp->quarterly,2,',','.')?><br/>
                                    <b><?="Rp " . number_format(($vp->quarterly/12),2,',','.')?></b>
                                </label>
                            </td>
                            <td>
                                <input type="radio" id="selected_price_<?=$vp->id?>_semiannually" name="selected_price[<?=$vp->id?>]" value="semiannually" <?=($vp->selected_price=="semiannually") ? 'checked="checked"' : '' ?> />
                                <br/>
                                <label for="selected_price_<?=$vp->id?>_semiannually">
                                    <?="Rp " . number_format($vp->semiannually,2,',','.')?><br/>
                                    <b><?="Rp " . number_format(($vp->semiannually/12),2,',','.')?></b>
                                </label>
                            </td>
                            <td>
                                <input type="radio" id="selected_price_<?=$vp->id?>_annually" name="selected_price[<?=$vp->id?>]" value="annually" <?=($vp->selected_price=="annually") ? 'checked="checked"' : '' ?> />
                                <br/>
                                <label for="selected_price_<?=$vp->id?>_annually">
                                    <?="Rp " . number_format($vp->annually,2,',','.')?><br/>
                                    <b><?="Rp " . number_format(($vp->annually/12),2,',','.')?></b>
                                </label>
                            </td>
                            <td>
                                <input type="radio" id="selected_price_<?=$vp->id?>_biennially" name="selected_price[<?=$vp->id?>]" value="biennially" <?=($vp->selected_price=="biennially") ? 'checked="checked"' : '' ?> />
                                <br/>
                                <label for="selected_price_<?=$vp->id?>_biennially">
                                    <?="Rp " . number_format($vp->biennially,2,',','.')?><br/>
                                    <b><?="Rp " . number_format(($vp->biennially/24),2,',','.')?></b>
                                </label>
                            </td>
                            <td>
                                <input type="radio" id="selected_price_<?=$vp->id?>_triennially" name="selected_price[<?=$vp->id?>]" value="triennially" <?=($vp->selected_price=="triennially" || empty($vp->selected_price)) ? 'checked="checked"' : '' ?> />
                                <br/>
                                <label for="selected_price_<?=$vp->id?>_triennially">
                                    <?="Rp " . number_format($vp->triennially,2,',','.')?><br/>
                                    <b><?="Rp " . number_format(($vp->triennially/36),2,',','.')?></b>
                                </label>
                            </td>
                        </tr>
                        <?php
                    }
                }
                echo "</table></div>
                <div class='col-md-12 text-center'>
                    <button type='submit' class='btn btn-success' name='action' value='update'>Update</button>
                    </form>
                </div></div>";
            }
            ?>
    </div>
</div>