<style>
    .nav-pills.nav-product-groups>li.active>a, .nav-pills.nav-product-groups>li.active>a:focus, .nav-pills.nav-product-groups>li.active>a:hover{

        background: linear-gradient(93.01deg, #0F1233 0%, #2C2F58 100%);

    }
    .nav-product-groups.nav-stacked>li+li{
        margin-top:10px;

    }
    .nav-product-groups.nav-pills>li>a {
        border-radius: 4px;
        border: 1px solid #CCCCCC;
        display: flex;
        justify-content: space-between;
    }
    .product-cards {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
        padding: 5px 10px;
        border: 1px solid #CCCCCC;
        min-height: 62px;
    }
    h5.product-card-title {
        margin-bottom: 0px;
        font-weight: bold;
        font-size: 12px;
    }

    .product-cards-info {
        max-height: 50px;
        overflow: hidden;
    }

    small.product-card-desc {
        font-size: 9px;
    }
    .product-cards-wrapper{
        padding-left: 5px;
        padding-right: 5px;
    }

    .product-cards-btn {
        margin-top: 10px;
        margin-left: 10px;
    }
    .product_group_name{
        margin-left: -10px;
        margin-bottom: 20px;
        font-weight: bold;
        margin-top: 0px;
    }
    #order-main-content{
        padding-left: 15px;
        padding-right: 15px;
    }
    span.product-count-label {
        background: #FF8708;
        padding: 4px;
        font-size: 12px;
        border-radius: 50%;
        width: 25px;
        height: 25px;
        text-align: center;
        color: white;
    }
</style>


<div id="order-main-content">
    <div class="row">
        <div class="col-md-3">
            <ul class="nav nav-pills nav-stacked nav nav-product-groups">
                {foreach from=$orderconfigs.group_type key=group_type_name item=group_type_item name=group_type_obj}
                    {if $smarty.foreach.group_type_obj.iteration eq 1}
                        <li class="active">
                            <a data-toggle="pill"
                               href="#group_type_tab_{$smarty.foreach.group_type_obj.iteration}"
                            >
                                {$group_type_name} <span class="product-count-label">{$group_type_item.total_product}</span>
                            </a>
                        </li>
                    {else}
                        <li>
                            <a data-toggle="pill" href="#group_type_tab_{$smarty.foreach.group_type_obj.iteration}">
                                {$group_type_name} <span class="product-count-label">{$group_type_item.total_product}</span>
                            </a>
                        </li>
                    {/if}
                {/foreach}
                <li>
                    <a href="/orders/domains">
                        Domain
                    </a>
                </li>
            </ul>
        </div>
        <div class="col-md-9">
            <div class="tab-content">
                {foreach from=$orderconfigs.group_type key=group_type_name item=group_type_item name=group_type_obj}
                    <div id="group_type_tab_{$smarty.foreach.group_type_obj.iteration}"
                            {if $smarty.foreach.group_type_obj.iteration eq 1}
                                class="tab-pane fade in active"
                            {else}
                                class="tab-pane fade"
                            {/if}
                    >
                        {foreach from=$group_type_item.product_group item=product_group_item}
                            <div class="list-product-group">
{*                                <div class="row">*}
                                    <h4 class="product_group_name">
                                        {$product_group_item.groupname}
                                    </h4>
{*                                </div>*}

                                <div class="row" style="margin-bottom: 30px;">
                                    {foreach from = $product_group_item.product_ingroup item = list_product}
                                        <div class="col-md-4 product-cards-wrapper">
                                            <div class="product-cards">
                                                <div class="product-cards-info">
                                                    <h5 class="product-card-title">
                                                        {$orderconfigs.products[$list_product].details.name}
                                                    </h5>
                                                    <small class="product-card-desc">
                                                        {$orderconfigs.products[$list_product].details.description|strip_tags}
                                                    </small>
                                                </div>
                                                <div class="product-cards-btn">
                                                    <a class="btn btn-sm btn-block btn-orange" href="/orders/products/{$list_product}"><i class="fas fa-cart-plus"></i></a>
                                                </div>
                                            </div>
                                        </div>
                                    {/foreach}
                                </div>
                            </div>
                        {/foreach}
                    </div>
                {/foreach}
            </div>
        </div>
    </div>
</div>
<script type="text/javascript">
    $('.main-content').css('margin-top','20px');
    $('.main-content .header-lined').css('padding-left','15px');
</script>