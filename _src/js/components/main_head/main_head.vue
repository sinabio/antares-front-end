<template>
    <section class="main-head">
        <div class="burgericon">
            <a class="" href="#"> <span class="line line-1"></span> <span class="line line-2"></span> <span class="line line-3"></span> </a>
        </div>
        <ul class="breadcrumbs">
            <!-- <li class=""><a href="#">Clients</a></li> -->
            <li>
                <div class="ddown">
                    <div class="ddown__init ddown__init--white"><a href="#">Dashboard</a></div>
                    <div class="ddown__content">
                        <div class="ddown__arrow"></div>
                        <ul class="ddown__menu">
                            <li class="ddown__header"><a href="#" class="mdl-js-button mdl-js-ripple-effect"><i class="zmdi zmdi-account-add"></i><span>Add New Client</span></a></li>
                            <li><a class="mdl-js-button mdl-js-ripple-effect" href="#"><i class="zmdi zmdi-file-plus"></i><span>Create Invoice</span></a></li>
                            <li><a class="mdl-js-button mdl-js-ripple-effect" href="#"><i class="zmdi zmdi-email"></i><span>Send Email</span></a></li>
                            <li><a class="mdl-js-button mdl-js-ripple-effect" href="#"><i class="zmdi zmdi-ticket-star"></i><span>Open New Ticket</span></a></li>
                            <li><a class="mdl-js-button mdl-js-ripple-effect" href="#"><i class="zmdi zmdi-accounts-list"></i><span>Add Contact</span></a></li>
                            <li><a class="mdl-js-button mdl-js-ripple-effect" href="#"><i class="zmdi zmdi-money-box"></i><span>Add Founds</span></a></li>
                            <li><a class="mdl-js-button mdl-js-ripple-effect" href="#"><i class="zmdi zmdi-square-right"></i><span>Login As Client</span></a></li>
                            <li class="ddown__footer"> <a href="#"><span>More</span></a>
                                <ul class="ddown__submenu">
                                    <li><a href="#" class="mdl-js-button mdl-js-ripple-effect"><i class="zmdi zmdi-account-add"></i><span>Add New Client</span></a></li>
                                    <li><a class="mdl-js-button mdl-js-ripple-effect" href="#"><i class="zmdi zmdi-money-box"></i><span>Add Founds</span></a></li>
                                    <li><a class="mdl-js-button mdl-js-ripple-effect" href="#"><i class="zmdi zmdi-money-box"></i><span>Add Founds</span></a></li>
                                    <li><a class="mdl-js-button mdl-js-ripple-effect" href="#"><i class="zmdi zmdi-ticket-star"></i><span>Open New Ticket</span></a></li>
                                    <li><a class="mdl-js-button mdl-js-ripple-effect" href="#"><i class="zmdi zmdi-money-box"></i><span>Add Founds</span></a></li>
                                    <li><a class="mdl-js-button mdl-js-ripple-effect" href="#"><i class="zmdi zmdi-money-box"></i><span>Add Founds</span></a></li>
                                    <li><a class="mdl-js-button mdl-js-ripple-effect" href="#"><i class="zmdi zmdi-ticket-star"></i><span>Open New Ticket</span></a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </li>
        </ul>
        <div class="search-box mr16"> <i class="zmdi zmdi-search"></i>
            <input type="hidden" name="_protection" value="" class="search-protection">
            <form action="#">
                <div class="search-box__mdl-textfield mdl-textfield mdl-js-textfield">
                    <input v-shortkey.focus="['f3']" class="mdl-textfield__input search-box__search-field" type="text" id="main-search" autocomplete>
                    <label class="mdl-textfield__label" for="#main-search">Search...</label>
                </div>
            </form> <i class="search-box__close zmdi zmdi-close mr16 "></i> </div>
        <div class="item-grp item-grp--40 mr16">
            <div class="item-grp-single" data-tooltip-inline="Widget Edit Toggle">
                <div class="mdl-js-button mdl-js-ripple-effect widget-edit" id="widgets-edit"> <i class="icon--widgets-edit "></i> </div>
            </div>
            <div class="item-grp-single" data-tooltip-inline="Notifications" @click="toggleNotifications" data-tooltip-my-position="top left" data-tooltip-target-position="bottom right"> 

            <span class="badge badge--top-right badge--md badge--green">{{notificationsCount}}</span>
                <div class="mdl-js-button mdl-js-ripple-effect">
                    <div class="main-head__alerts"><i class="icon--alert"></i></div>
                </div>
            </div>
            <div class="item-grp-single" data-tooltip-inline="Alerts" @click="toggleAlerts"> <span class="badge badge--top-right badge--md badge--green">{{alertsCount}}</span>
                <div class="mdl-js-button mdl-js-ripple-effect">
                    <div class="main-head__alerts"><i class="zmdi zmdi-alert-triangle"></i></div>
                </div>
            </div>
            <div class="item-grp-single">
                <div class="ddown ddown--user">
                    <div class="ddown__init ddown__init--clean mdl-js-button mdl-js-ripple-effect">
                        <div class="avatar avatar--xs"> <img src="img/avatars/avatar_sample_4.png" alt="Avatar" /> </div>
                    </div>
                    <div class="ddown__content">
                        <div class="ddown__arrow"></div>
                        <ul class="ddown__menu">
                            <li class="ddown__header">
                                <a class="mdl-js-button mdl-js-ripple-effect" href="#">
                                    <div class="flex-block">
                                        <div class="avatar avatar--lg"> <img src="img/brand/brand-rsstudio--lg.png" alt="RS Studio"> </div>
                                        <div class="flex-block__content"> <span class="flex-block__title">Paweł Bis</span> <span class="flex-block__desc">paul@rsstudio.net</span> </div>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a class="mdl-js-button mdl-js-ripple-effect" href="#"> <i class="zmdi zmdi-file-plus"></i> View Profile </a>
                            </li>
                            <li>
                                <a class="mdl-js-button mdl-js-ripple-effect" href="#"> <i class="zmdi zmdi-email"></i> Something Else </a>
                            </li>
                            <li class="ddown__footer">
                                <a class="mdl-js-button mdl-js-ripple-effect" href="#"> <i class="zmdi zmdi-sign-in"></i> Sign Out </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="ddown ddown--brand">
            <div class="ddown__init ddown__init--white btn btn--md btn--brand mdl-js-button mdl-js-ripple-effect">RS Studio</div>
            <div class="ddown__content">
                <div class="ddown__arrow"></div>
                <ul class="ddown__menu">
                    <li class="ddown__header"><span>Change Brand</span></li>
                    <li>
                        <a class="mdl-js-button mdl-js-ripple-effect" href="#">
                            <div class="flex-block">
                                <div class="avatar avatar--xs"> <img src="img/brand/brand-rsstudio.png" alt="Avatar" /> </div>
                                <div class="flex-block__content"> <span class="flex-block__title">RS Studio</span> </div>
                            </div>
                        </a>
                    </li>
                    <li class="is-selected">
                        <a class="mdl-js-button mdl-js-ripple-effect" href="#">
                            <div class="flex-block">
                                <div class="avatar avatar--xs"> <img src="img/brand/brand-inbs.png" alt="Avatar" /> </div>
                                <div class="flex-block__content"> <span class="flex-block__title">INBS.software</span> </div>
                            </div>
                        </a>
                    </li>
                    <li class="ddown__footer">
                        <a class="mdl-js-button mdl-js-ripple-effect" href="brand_settings.html"> <i class="zmdi zmdi-settings"></i> Manage Brands </a>
                    </li>
                </ul>
            </div>
        </div>
    </section>
</template>
<script>
export default {
    name: 'mainHead',
    mounted() {
        var self = this;
        this.$root.$on('notificationsCount', function(notificationLength) {
            self.notificationsCount = notificationLength;
        });
        this.$root.$on('alertsCount', function(notificationLength) {
            self.alertsCount = notificationLength;
        });
    },
    data() {
        return {
            notificationsCount: '20',
            alertsCount: '3'
        }
    },
    methods: {
        toggleNotifications() {
            this.$root.$emit('sidebarNotifications');
        },
        toggleAlerts() {
            this.$root.$emit('sidebarAlerts');
        }
    }
}
</script>
<style lang="less">
</style>
