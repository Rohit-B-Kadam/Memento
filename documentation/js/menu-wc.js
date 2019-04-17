'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">memento documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="dependencies.html" data-type="chapter-link">
                                <span class="icon ion-ios-list"></span>Dependencies
                            </a>
                        </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse" ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AngularMaterialModule.html" data-type="entity-link">AngularMaterialModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-a5093afc43db34664104c9e93f4c1cb6"' : 'data-target="#xs-components-links-module-AppModule-a5093afc43db34664104c9e93f4c1cb6"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-a5093afc43db34664104c9e93f4c1cb6"' :
                                            'id="xs-components-links-module-AppModule-a5093afc43db34664104c9e93f4c1cb6"' }>
                                            <li class="link">
                                                <a href="components/AddCategoryDialogComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AddCategoryDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AddFriendComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AddFriendComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AdvanceSearchComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AdvanceSearchComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CreateEventComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CreateEventComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DocumentsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DocumentsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DuplicateComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DuplicateComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditEventComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EditEventComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EventDetailComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EventDetailComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EventGalleryComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EventGalleryComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EventListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EventListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FaceDetectComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FaceDetectComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FourZeroFourPageComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FourZeroFourPageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FriendListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FriendListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MainLayoutComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MainLayoutComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NavbarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NavbarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OtherPhotosComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OtherPhotosComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PasswordCheckingComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PasswordCheckingComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PeopleListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PeopleListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PhotoThambnailComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PhotoThambnailComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PhotoViewerComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PhotoViewerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProfileComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProfileComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ReDirectToLatestEventComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ReDirectToLatestEventComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RegistrationComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RegistrationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SearchEventComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SearchEventComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SidebarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SidebarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SlideShowComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SlideShowComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TimelineComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TimelineComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-AppModule-a5093afc43db34664104c9e93f4c1cb6"' : 'data-target="#xs-directives-links-module-AppModule-a5093afc43db34664104c9e93f4c1cb6"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-AppModule-a5093afc43db34664104c9e93f4c1cb6"' :
                                        'id="xs-directives-links-module-AppModule-a5093afc43db34664104c9e93f4c1cb6"' }>
                                        <li class="link">
                                            <a href="directives/FileDropDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">FileDropDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/WebviewDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">WebviewDirective</a>
                                        </li>
                                    </ul>
                                </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-a5093afc43db34664104c9e93f4c1cb6"' : 'data-target="#xs-injectables-links-module-AppModule-a5093afc43db34664104c9e93f4c1cb6"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-a5093afc43db34664104c9e93f4c1cb6"' :
                                        'id="xs-injectables-links-module-AppModule-a5093afc43db34664104c9e93f4c1cb6"' }>
                                        <li class="link">
                                            <a href="injectables/ElectronService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ElectronService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/FaceRecognitionService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>FaceRecognitionService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/NedbModule.html" data-type="entity-link">NedbModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Category.html" data-type="entity-link">Category</a>
                            </li>
                            <li class="link">
                                <a href="classes/EventInfo.html" data-type="entity-link">EventInfo</a>
                            </li>
                            <li class="link">
                                <a href="classes/FileNode.html" data-type="entity-link">FileNode</a>
                            </li>
                            <li class="link">
                                <a href="classes/FlatTreeNode.html" data-type="entity-link">FlatTreeNode</a>
                            </li>
                            <li class="link">
                                <a href="classes/FriendProfile.html" data-type="entity-link">FriendProfile</a>
                            </li>
                            <li class="link">
                                <a href="classes/MyErrorStateMatcher.html" data-type="entity-link">MyErrorStateMatcher</a>
                            </li>
                            <li class="link">
                                <a href="classes/PhotoInfo.html" data-type="entity-link">PhotoInfo</a>
                            </li>
                            <li class="link">
                                <a href="classes/StoreTempData.html" data-type="entity-link">StoreTempData</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link">User</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/CatergoryCollectionService.html" data-type="entity-link">CatergoryCollectionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CurrentUserService.html" data-type="entity-link">CurrentUserService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EventPhotoInteractionService.html" data-type="entity-link">EventPhotoInteractionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EventsService.html" data-type="entity-link">EventsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FriendsService.html" data-type="entity-link">FriendsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PhotoCollectionService.html" data-type="entity-link">PhotoCollectionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersService.html" data-type="entity-link">UsersService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});