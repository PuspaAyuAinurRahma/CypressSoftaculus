var ApiHelper       = require(__dirname + "/../../helpers/api/api.js");
var RegionHelper    = {
    Configs:{
        Indoregions:[],
        Indocities:[]
    },
    renderCountries : function (formid, countryelm, regionelm, cityelm) {
        ApiHelper.getCountries(function (response) {
            var elementcountry = $(formid).find('[name="'+countryelm+'"]');
            $.each(response, function (index, item) {
                if(index!='ID'){
                    elementcountry.append('<option value="'+index+'">'+item.name+'</option>');
                }
            });
        });
        ApiHelper.getRegion(function (response) {
            RegionHelper.Configs.Indoregions =response;
            RegionHelper.renderRegion(formid, countryelm, regionelm, cityelm);
        });
        ApiHelper.getCity(function (response) {
            RegionHelper.Configs.Indocities = response;
            // RegionHelper.renderCity(formid, countryelm, regionelm, cityelm);
        });
        RegionHelper.changeCountry(formid, countryelm, regionelm, cityelm);
    },
    renderRegion: function (formid, countryelm, regionelm, cityelm) {
        var country = $(formid).find('[name="'+countryelm+'"]').val();
        if(country=='ID')
        {
            var opentag = "<select class='form-control' name='"+regionelm+"' required>";
            var option = "";
            $.each(RegionHelper.Configs.Indoregions, function (index, item) {
                if(index==0){
                    option = option+"<option value='"+item.name+"' selected data-id='"+item.id+"'>"+item.name+"</option>";
                }else{
                    option = option+"<option value='"+item.name+"' data-id='"+item.id+"'>"+item.name+"</option>";
                }
            });
            var closetag= "</select>";
            var htmltag = opentag+option+closetag;
            $(formid).find('[name="'+regionelm+'"]').replaceWith(htmltag);
        }else{
            var htmltag = '<input name="'+regionelm+'" class="form-control" maxlength="15" placeholder="Ex: DKI Jakarta" required="">';
            var citytag = '<input class="form-control" type="text" name="'+cityelm+'" placeholder="Ex: Jakarta" maxlength="15" required>';

            $(formid).find('[name="'+regionelm+'"]').replaceWith(htmltag);
            $(formid).find('[name="'+cityelm+'"]').replaceWith(citytag);
        }

        // RegionHelper.changeRegion(formid, countryelm, regionelm, cityelm);
    },
    renderCity: function (formid, countryelm, regionelm, cityelm) {
        var state_id = $(formid).find('[name="'+regionelm+'"]').val();
        var opentag = "<select class='form-control' name='"+cityelm+"' required>";
        var option = "";
        $.each(RegionHelper.Configs.Indocities, function (index, item) {
            if(item.regency_id==state_id){
                option = option+"<option value='"+item.name+"'>"+item.name+"</option>";
            }
        });
        var closetag= "</select>";
        var htmltag = opentag+option+closetag;
        $(formid).find('[name="'+cityelm+'"]').replaceWith(htmltag);
    },
    changeCountry: function (formid, countryelm, regionelm, cityelm) {
        $(formid).find('[name="'+countryelm+'"]').on('change', function (e) {
            e.preventDefault();
            RegionHelper.renderRegion(formid, countryelm, regionelm, cityelm);
        });
    },
    changeRegion: function (formid, countryelm, regionelm, cityelm) {
        $(formid).find('[name="'+regionelm+'"]').on('change', function (e) {
            e.preventDefault();
            // RegionHelper.renderCity(formid, countryelm, regionelm, cityelm);
        });
    },
};
module.exports = RegionHelper;