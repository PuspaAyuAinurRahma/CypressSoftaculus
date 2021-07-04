<script>
    var global_vars = new Object();
    {if $url == "/cart.php?a=checkout"}
        {if $tmp_pass}
    global_vars.pass1 = "{$tmp_pass['pass1']}";
    global_vars.pass2 = "{$tmp_pass['pass2']}";
        {/if}
    {/if}
    {if $is_logged_in}
    global_vars.isLoggedIn = {$is_logged_in};
    {/if}
</script>