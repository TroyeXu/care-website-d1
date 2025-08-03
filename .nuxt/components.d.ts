
import type { DefineComponent, SlotsType } from 'vue'
type IslandComponent<T extends DefineComponent> = T & DefineComponent<{}, {refresh: () => Promise<void>}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, SlotsType<{ fallback: { error: unknown } }>>
type HydrationStrategies = {
  hydrateOnVisible?: IntersectionObserverInit | true
  hydrateOnIdle?: number | true
  hydrateOnInteraction?: keyof HTMLElementEventMap | Array<keyof HTMLElementEventMap> | true
  hydrateOnMediaQuery?: string
  hydrateAfter?: number
  hydrateWhen?: boolean
  hydrateNever?: true
}
type LazyComponent<T> = (T & DefineComponent<HydrationStrategies, {}, {}, {}, {}, {}, {}, { hydrated: () => void }>)
interface _GlobalComponents {
      'BookingForm': typeof import("../app/components/BookingForm.vue")['default']
    'CaregiverCard': typeof import("../app/components/CaregiverCard.vue")['default']
    'ConsultationForm': typeof import("../app/components/ConsultationForm.vue")['default']
    'LoginForm': typeof import("../app/components/LoginForm.vue")['default']
    'PaymentForm': typeof import("../app/components/PaymentForm.vue")['default']
    'RegisterForm': typeof import("../app/components/RegisterForm.vue")['default']
    'CommonCaregiverListItem': typeof import("../app/components/common/CaregiverListItem.vue")['default']
    'CommonEmptyState': typeof import("../app/components/common/EmptyState.vue")['default']
    'CommonFilterPanel': typeof import("../app/components/common/FilterPanel.vue")['default']
    'CommonLoadingState': typeof import("../app/components/common/LoadingState.vue")['default']
    'CommonPageHeader': typeof import("../app/components/common/PageHeader.vue")['default']
    'CommonStatCard': typeof import("../app/components/common/StatCard.vue")['default']
    'CommonStatusChip': typeof import("../app/components/common/StatusChip.vue")['default']
    'FormButton': typeof import("../app/components/form/FormButton.vue")['default']
    'FormInput': typeof import("../app/components/form/FormInput.vue")['default']
    'FormPasswordInput': typeof import("../app/components/form/PasswordInput.vue")['default']
    'NuxtWelcome': typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']
    'NuxtLayout': typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
    'NuxtErrorBoundary': typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
    'ClientOnly': typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']
    'DevOnly': typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']
    'ServerPlaceholder': typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
    'NuxtLink': typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']
    'NuxtLoadingIndicator': typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
    'NuxtTime': typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
    'NuxtRouteAnnouncer': typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
    'NuxtImg': typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
    'NuxtPicture': typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
    'VitePwaManifest': typeof import("../node_modules/@vite-pwa/nuxt/dist/runtime/components/VitePwaManifest")['default']
    'NuxtPwaManifest': typeof import("../node_modules/@vite-pwa/nuxt/dist/runtime/components/VitePwaManifest")['default']
    'NuxtPwaAssets': typeof import("../node_modules/@vite-pwa/nuxt/dist/runtime/components/NuxtPwaAssets")['default']
    'PwaAppleImage': typeof import("../node_modules/@vite-pwa/nuxt/dist/runtime/components/PwaAppleImage.vue")['default']
    'PwaAppleSplashScreenImage': typeof import("../node_modules/@vite-pwa/nuxt/dist/runtime/components/PwaAppleSplashScreenImage.vue")['default']
    'PwaFaviconImage': typeof import("../node_modules/@vite-pwa/nuxt/dist/runtime/components/PwaFaviconImage.vue")['default']
    'PwaMaskableImage': typeof import("../node_modules/@vite-pwa/nuxt/dist/runtime/components/PwaMaskableImage.vue")['default']
    'PwaTransparentImage': typeof import("../node_modules/@vite-pwa/nuxt/dist/runtime/components/PwaTransparentImage.vue")['default']
    'NuxtLinkLocale': typeof import("../node_modules/@nuxtjs/i18n/dist/runtime/components/NuxtLinkLocale")['default']
    'SwitchLocalePathLink': typeof import("../node_modules/@nuxtjs/i18n/dist/runtime/components/SwitchLocalePathLink")['default']
    'QAjaxBar': typeof import("quasar")['QAjaxBar']
    'QAvatar': typeof import("quasar")['QAvatar']
    'QBadge': typeof import("quasar")['QBadge']
    'QBanner': typeof import("quasar")['QBanner']
    'QBar': typeof import("quasar")['QBar']
    'QBreadcrumbs': typeof import("quasar")['QBreadcrumbs']
    'QBreadcrumbsEl': typeof import("quasar")['QBreadcrumbsEl']
    'QBtn': typeof import("quasar")['QBtn']
    'QBtnDropdown': typeof import("quasar")['QBtnDropdown']
    'QBtnGroup': typeof import("quasar")['QBtnGroup']
    'QBtnToggle': typeof import("quasar")['QBtnToggle']
    'QCard': typeof import("quasar")['QCard']
    'QCardActions': typeof import("quasar")['QCardActions']
    'QCardSection': typeof import("quasar")['QCardSection']
    'QCarousel': typeof import("quasar")['QCarousel']
    'QCarouselControl': typeof import("quasar")['QCarouselControl']
    'QCarouselSlide': typeof import("quasar")['QCarouselSlide']
    'QChatMessage': typeof import("quasar")['QChatMessage']
    'QCheckbox': typeof import("quasar")['QCheckbox']
    'QChip': typeof import("quasar")['QChip']
    'QCircularProgress': typeof import("quasar")['QCircularProgress']
    'QColor': typeof import("quasar")['QColor']
    'QDate': typeof import("quasar")['QDate']
    'QDialog': typeof import("quasar")['QDialog']
    'QDrawer': typeof import("quasar")['QDrawer']
    'QEditor': typeof import("quasar")['QEditor']
    'QExpansionItem': typeof import("quasar")['QExpansionItem']
    'QFab': typeof import("quasar")['QFab']
    'QFabAction': typeof import("quasar")['QFabAction']
    'QField': typeof import("quasar")['QField']
    'QFile': typeof import("quasar")['QFile']
    'QFooter': typeof import("quasar")['QFooter']
    'QForm': typeof import("quasar")['QForm']
    'QFormChildMixin': typeof import("quasar")['QFormChildMixin']
    'QHeader': typeof import("quasar")['QHeader']
    'QIcon': typeof import("quasar")['QIcon']
    'QImg': typeof import("quasar")['QImg']
    'QInfiniteScroll': typeof import("quasar")['QInfiniteScroll']
    'QInnerLoading': typeof import("quasar")['QInnerLoading']
    'QInput': typeof import("quasar")['QInput']
    'QIntersection': typeof import("quasar")['QIntersection']
    'QItem': typeof import("quasar")['QItem']
    'QItemLabel': typeof import("quasar")['QItemLabel']
    'QItemSection': typeof import("quasar")['QItemSection']
    'QList': typeof import("quasar")['QList']
    'QKnob': typeof import("quasar")['QKnob']
    'QLayout': typeof import("quasar")['QLayout']
    'QLinearProgress': typeof import("quasar")['QLinearProgress']
    'QMarkupTable': typeof import("quasar")['QMarkupTable']
    'QMenu': typeof import("quasar")['QMenu']
    'QNoSsr': typeof import("quasar")['QNoSsr']
    'QOptionGroup': typeof import("quasar")['QOptionGroup']
    'QPage': typeof import("quasar")['QPage']
    'QPageContainer': typeof import("quasar")['QPageContainer']
    'QPageScroller': typeof import("quasar")['QPageScroller']
    'QPageSticky': typeof import("quasar")['QPageSticky']
    'QPagination': typeof import("quasar")['QPagination']
    'QParallax': typeof import("quasar")['QParallax']
    'QPopupEdit': typeof import("quasar")['QPopupEdit']
    'QPopupProxy': typeof import("quasar")['QPopupProxy']
    'QPullToRefresh': typeof import("quasar")['QPullToRefresh']
    'QRadio': typeof import("quasar")['QRadio']
    'QRange': typeof import("quasar")['QRange']
    'QRating': typeof import("quasar")['QRating']
    'QResizeObserver': typeof import("quasar")['QResizeObserver']
    'QResponsive': typeof import("quasar")['QResponsive']
    'QScrollArea': typeof import("quasar")['QScrollArea']
    'QScrollObserver': typeof import("quasar")['QScrollObserver']
    'QSelect': typeof import("quasar")['QSelect']
    'QSeparator': typeof import("quasar")['QSeparator']
    'QSkeleton': typeof import("quasar")['QSkeleton']
    'QSlideItem': typeof import("quasar")['QSlideItem']
    'QSlideTransition': typeof import("quasar")['QSlideTransition']
    'QSlider': typeof import("quasar")['QSlider']
    'QSpace': typeof import("quasar")['QSpace']
    'QSpinner': typeof import("quasar")['QSpinner']
    'QSpinnerAudio': typeof import("quasar")['QSpinnerAudio']
    'QSpinnerBall': typeof import("quasar")['QSpinnerBall']
    'QSpinnerBars': typeof import("quasar")['QSpinnerBars']
    'QSpinnerBox': typeof import("quasar")['QSpinnerBox']
    'QSpinnerClock': typeof import("quasar")['QSpinnerClock']
    'QSpinnerComment': typeof import("quasar")['QSpinnerComment']
    'QSpinnerCube': typeof import("quasar")['QSpinnerCube']
    'QSpinnerDots': typeof import("quasar")['QSpinnerDots']
    'QSpinnerFacebook': typeof import("quasar")['QSpinnerFacebook']
    'QSpinnerGears': typeof import("quasar")['QSpinnerGears']
    'QSpinnerGrid': typeof import("quasar")['QSpinnerGrid']
    'QSpinnerHearts': typeof import("quasar")['QSpinnerHearts']
    'QSpinnerHourglass': typeof import("quasar")['QSpinnerHourglass']
    'QSpinnerInfinity': typeof import("quasar")['QSpinnerInfinity']
    'QSpinnerIos': typeof import("quasar")['QSpinnerIos']
    'QSpinnerOrbit': typeof import("quasar")['QSpinnerOrbit']
    'QSpinnerOval': typeof import("quasar")['QSpinnerOval']
    'QSpinnerPie': typeof import("quasar")['QSpinnerPie']
    'QSpinnerPuff': typeof import("quasar")['QSpinnerPuff']
    'QSpinnerRadio': typeof import("quasar")['QSpinnerRadio']
    'QSpinnerRings': typeof import("quasar")['QSpinnerRings']
    'QSpinnerTail': typeof import("quasar")['QSpinnerTail']
    'QSplitter': typeof import("quasar")['QSplitter']
    'QStep': typeof import("quasar")['QStep']
    'QStepper': typeof import("quasar")['QStepper']
    'QStepperNavigation': typeof import("quasar")['QStepperNavigation']
    'QTabPanel': typeof import("quasar")['QTabPanel']
    'QTabPanels': typeof import("quasar")['QTabPanels']
    'QTable': typeof import("quasar")['QTable']
    'QTd': typeof import("quasar")['QTd']
    'QTh': typeof import("quasar")['QTh']
    'QTr': typeof import("quasar")['QTr']
    'QRouteTab': typeof import("quasar")['QRouteTab']
    'QTab': typeof import("quasar")['QTab']
    'QTabs': typeof import("quasar")['QTabs']
    'QTime': typeof import("quasar")['QTime']
    'QTimeline': typeof import("quasar")['QTimeline']
    'QTimelineEntry': typeof import("quasar")['QTimelineEntry']
    'QToggle': typeof import("quasar")['QToggle']
    'QToolbar': typeof import("quasar")['QToolbar']
    'QToolbarTitle': typeof import("quasar")['QToolbarTitle']
    'QTooltip': typeof import("quasar")['QTooltip']
    'QTree': typeof import("quasar")['QTree']
    'QUploader': typeof import("quasar")['QUploader']
    'QUploaderAddTrigger': typeof import("quasar")['QUploaderAddTrigger']
    'QVideo': typeof import("quasar")['QVideo']
    'QVirtualScroll': typeof import("quasar")['QVirtualScroll']
    'SiteLink': typeof import("../node_modules/nuxt-site-config/dist/runtime/nuxt/component/SiteLink.vue")['default']
    'ErrorMessage': typeof import("vee-validate")['ErrorMessage']
    'Field': typeof import("vee-validate")['Field']
    'FieldArray': typeof import("vee-validate")['FieldArray']
    'Form': typeof import("vee-validate")['Form']
    'NuxtPage': typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']
    'NoScript': typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']
    'Link': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']
    'Base': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']
    'Title': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']
    'Meta': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']
    'Style': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']
    'Head': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']
    'Html': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']
    'Body': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']
    'NuxtIsland': typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']
    'NuxtRouteAnnouncer': typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
      'LazyBookingForm': LazyComponent<typeof import("../app/components/BookingForm.vue")['default']>
    'LazyCaregiverCard': LazyComponent<typeof import("../app/components/CaregiverCard.vue")['default']>
    'LazyConsultationForm': LazyComponent<typeof import("../app/components/ConsultationForm.vue")['default']>
    'LazyLoginForm': LazyComponent<typeof import("../app/components/LoginForm.vue")['default']>
    'LazyPaymentForm': LazyComponent<typeof import("../app/components/PaymentForm.vue")['default']>
    'LazyRegisterForm': LazyComponent<typeof import("../app/components/RegisterForm.vue")['default']>
    'LazyCommonCaregiverListItem': LazyComponent<typeof import("../app/components/common/CaregiverListItem.vue")['default']>
    'LazyCommonEmptyState': LazyComponent<typeof import("../app/components/common/EmptyState.vue")['default']>
    'LazyCommonFilterPanel': LazyComponent<typeof import("../app/components/common/FilterPanel.vue")['default']>
    'LazyCommonLoadingState': LazyComponent<typeof import("../app/components/common/LoadingState.vue")['default']>
    'LazyCommonPageHeader': LazyComponent<typeof import("../app/components/common/PageHeader.vue")['default']>
    'LazyCommonStatCard': LazyComponent<typeof import("../app/components/common/StatCard.vue")['default']>
    'LazyCommonStatusChip': LazyComponent<typeof import("../app/components/common/StatusChip.vue")['default']>
    'LazyFormButton': LazyComponent<typeof import("../app/components/form/FormButton.vue")['default']>
    'LazyFormInput': LazyComponent<typeof import("../app/components/form/FormInput.vue")['default']>
    'LazyFormPasswordInput': LazyComponent<typeof import("../app/components/form/PasswordInput.vue")['default']>
    'LazyNuxtWelcome': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
    'LazyNuxtLayout': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
    'LazyNuxtErrorBoundary': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
    'LazyClientOnly': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']>
    'LazyDevOnly': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']>
    'LazyServerPlaceholder': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
    'LazyNuxtLink': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
    'LazyNuxtLoadingIndicator': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
    'LazyNuxtTime': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
    'LazyNuxtRouteAnnouncer': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
    'LazyNuxtImg': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']>
    'LazyNuxtPicture': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']>
    'LazyVitePwaManifest': LazyComponent<typeof import("../node_modules/@vite-pwa/nuxt/dist/runtime/components/VitePwaManifest")['default']>
    'LazyNuxtPwaManifest': LazyComponent<typeof import("../node_modules/@vite-pwa/nuxt/dist/runtime/components/VitePwaManifest")['default']>
    'LazyNuxtPwaAssets': LazyComponent<typeof import("../node_modules/@vite-pwa/nuxt/dist/runtime/components/NuxtPwaAssets")['default']>
    'LazyPwaAppleImage': LazyComponent<typeof import("../node_modules/@vite-pwa/nuxt/dist/runtime/components/PwaAppleImage.vue")['default']>
    'LazyPwaAppleSplashScreenImage': LazyComponent<typeof import("../node_modules/@vite-pwa/nuxt/dist/runtime/components/PwaAppleSplashScreenImage.vue")['default']>
    'LazyPwaFaviconImage': LazyComponent<typeof import("../node_modules/@vite-pwa/nuxt/dist/runtime/components/PwaFaviconImage.vue")['default']>
    'LazyPwaMaskableImage': LazyComponent<typeof import("../node_modules/@vite-pwa/nuxt/dist/runtime/components/PwaMaskableImage.vue")['default']>
    'LazyPwaTransparentImage': LazyComponent<typeof import("../node_modules/@vite-pwa/nuxt/dist/runtime/components/PwaTransparentImage.vue")['default']>
    'LazyNuxtLinkLocale': LazyComponent<typeof import("../node_modules/@nuxtjs/i18n/dist/runtime/components/NuxtLinkLocale")['default']>
    'LazySwitchLocalePathLink': LazyComponent<typeof import("../node_modules/@nuxtjs/i18n/dist/runtime/components/SwitchLocalePathLink")['default']>
    'LazyQAjaxBar': LazyComponent<typeof import("quasar")['QAjaxBar']>
    'LazyQAvatar': LazyComponent<typeof import("quasar")['QAvatar']>
    'LazyQBadge': LazyComponent<typeof import("quasar")['QBadge']>
    'LazyQBanner': LazyComponent<typeof import("quasar")['QBanner']>
    'LazyQBar': LazyComponent<typeof import("quasar")['QBar']>
    'LazyQBreadcrumbs': LazyComponent<typeof import("quasar")['QBreadcrumbs']>
    'LazyQBreadcrumbsEl': LazyComponent<typeof import("quasar")['QBreadcrumbsEl']>
    'LazyQBtn': LazyComponent<typeof import("quasar")['QBtn']>
    'LazyQBtnDropdown': LazyComponent<typeof import("quasar")['QBtnDropdown']>
    'LazyQBtnGroup': LazyComponent<typeof import("quasar")['QBtnGroup']>
    'LazyQBtnToggle': LazyComponent<typeof import("quasar")['QBtnToggle']>
    'LazyQCard': LazyComponent<typeof import("quasar")['QCard']>
    'LazyQCardActions': LazyComponent<typeof import("quasar")['QCardActions']>
    'LazyQCardSection': LazyComponent<typeof import("quasar")['QCardSection']>
    'LazyQCarousel': LazyComponent<typeof import("quasar")['QCarousel']>
    'LazyQCarouselControl': LazyComponent<typeof import("quasar")['QCarouselControl']>
    'LazyQCarouselSlide': LazyComponent<typeof import("quasar")['QCarouselSlide']>
    'LazyQChatMessage': LazyComponent<typeof import("quasar")['QChatMessage']>
    'LazyQCheckbox': LazyComponent<typeof import("quasar")['QCheckbox']>
    'LazyQChip': LazyComponent<typeof import("quasar")['QChip']>
    'LazyQCircularProgress': LazyComponent<typeof import("quasar")['QCircularProgress']>
    'LazyQColor': LazyComponent<typeof import("quasar")['QColor']>
    'LazyQDate': LazyComponent<typeof import("quasar")['QDate']>
    'LazyQDialog': LazyComponent<typeof import("quasar")['QDialog']>
    'LazyQDrawer': LazyComponent<typeof import("quasar")['QDrawer']>
    'LazyQEditor': LazyComponent<typeof import("quasar")['QEditor']>
    'LazyQExpansionItem': LazyComponent<typeof import("quasar")['QExpansionItem']>
    'LazyQFab': LazyComponent<typeof import("quasar")['QFab']>
    'LazyQFabAction': LazyComponent<typeof import("quasar")['QFabAction']>
    'LazyQField': LazyComponent<typeof import("quasar")['QField']>
    'LazyQFile': LazyComponent<typeof import("quasar")['QFile']>
    'LazyQFooter': LazyComponent<typeof import("quasar")['QFooter']>
    'LazyQForm': LazyComponent<typeof import("quasar")['QForm']>
    'LazyQFormChildMixin': LazyComponent<typeof import("quasar")['QFormChildMixin']>
    'LazyQHeader': LazyComponent<typeof import("quasar")['QHeader']>
    'LazyQIcon': LazyComponent<typeof import("quasar")['QIcon']>
    'LazyQImg': LazyComponent<typeof import("quasar")['QImg']>
    'LazyQInfiniteScroll': LazyComponent<typeof import("quasar")['QInfiniteScroll']>
    'LazyQInnerLoading': LazyComponent<typeof import("quasar")['QInnerLoading']>
    'LazyQInput': LazyComponent<typeof import("quasar")['QInput']>
    'LazyQIntersection': LazyComponent<typeof import("quasar")['QIntersection']>
    'LazyQItem': LazyComponent<typeof import("quasar")['QItem']>
    'LazyQItemLabel': LazyComponent<typeof import("quasar")['QItemLabel']>
    'LazyQItemSection': LazyComponent<typeof import("quasar")['QItemSection']>
    'LazyQList': LazyComponent<typeof import("quasar")['QList']>
    'LazyQKnob': LazyComponent<typeof import("quasar")['QKnob']>
    'LazyQLayout': LazyComponent<typeof import("quasar")['QLayout']>
    'LazyQLinearProgress': LazyComponent<typeof import("quasar")['QLinearProgress']>
    'LazyQMarkupTable': LazyComponent<typeof import("quasar")['QMarkupTable']>
    'LazyQMenu': LazyComponent<typeof import("quasar")['QMenu']>
    'LazyQNoSsr': LazyComponent<typeof import("quasar")['QNoSsr']>
    'LazyQOptionGroup': LazyComponent<typeof import("quasar")['QOptionGroup']>
    'LazyQPage': LazyComponent<typeof import("quasar")['QPage']>
    'LazyQPageContainer': LazyComponent<typeof import("quasar")['QPageContainer']>
    'LazyQPageScroller': LazyComponent<typeof import("quasar")['QPageScroller']>
    'LazyQPageSticky': LazyComponent<typeof import("quasar")['QPageSticky']>
    'LazyQPagination': LazyComponent<typeof import("quasar")['QPagination']>
    'LazyQParallax': LazyComponent<typeof import("quasar")['QParallax']>
    'LazyQPopupEdit': LazyComponent<typeof import("quasar")['QPopupEdit']>
    'LazyQPopupProxy': LazyComponent<typeof import("quasar")['QPopupProxy']>
    'LazyQPullToRefresh': LazyComponent<typeof import("quasar")['QPullToRefresh']>
    'LazyQRadio': LazyComponent<typeof import("quasar")['QRadio']>
    'LazyQRange': LazyComponent<typeof import("quasar")['QRange']>
    'LazyQRating': LazyComponent<typeof import("quasar")['QRating']>
    'LazyQResizeObserver': LazyComponent<typeof import("quasar")['QResizeObserver']>
    'LazyQResponsive': LazyComponent<typeof import("quasar")['QResponsive']>
    'LazyQScrollArea': LazyComponent<typeof import("quasar")['QScrollArea']>
    'LazyQScrollObserver': LazyComponent<typeof import("quasar")['QScrollObserver']>
    'LazyQSelect': LazyComponent<typeof import("quasar")['QSelect']>
    'LazyQSeparator': LazyComponent<typeof import("quasar")['QSeparator']>
    'LazyQSkeleton': LazyComponent<typeof import("quasar")['QSkeleton']>
    'LazyQSlideItem': LazyComponent<typeof import("quasar")['QSlideItem']>
    'LazyQSlideTransition': LazyComponent<typeof import("quasar")['QSlideTransition']>
    'LazyQSlider': LazyComponent<typeof import("quasar")['QSlider']>
    'LazyQSpace': LazyComponent<typeof import("quasar")['QSpace']>
    'LazyQSpinner': LazyComponent<typeof import("quasar")['QSpinner']>
    'LazyQSpinnerAudio': LazyComponent<typeof import("quasar")['QSpinnerAudio']>
    'LazyQSpinnerBall': LazyComponent<typeof import("quasar")['QSpinnerBall']>
    'LazyQSpinnerBars': LazyComponent<typeof import("quasar")['QSpinnerBars']>
    'LazyQSpinnerBox': LazyComponent<typeof import("quasar")['QSpinnerBox']>
    'LazyQSpinnerClock': LazyComponent<typeof import("quasar")['QSpinnerClock']>
    'LazyQSpinnerComment': LazyComponent<typeof import("quasar")['QSpinnerComment']>
    'LazyQSpinnerCube': LazyComponent<typeof import("quasar")['QSpinnerCube']>
    'LazyQSpinnerDots': LazyComponent<typeof import("quasar")['QSpinnerDots']>
    'LazyQSpinnerFacebook': LazyComponent<typeof import("quasar")['QSpinnerFacebook']>
    'LazyQSpinnerGears': LazyComponent<typeof import("quasar")['QSpinnerGears']>
    'LazyQSpinnerGrid': LazyComponent<typeof import("quasar")['QSpinnerGrid']>
    'LazyQSpinnerHearts': LazyComponent<typeof import("quasar")['QSpinnerHearts']>
    'LazyQSpinnerHourglass': LazyComponent<typeof import("quasar")['QSpinnerHourglass']>
    'LazyQSpinnerInfinity': LazyComponent<typeof import("quasar")['QSpinnerInfinity']>
    'LazyQSpinnerIos': LazyComponent<typeof import("quasar")['QSpinnerIos']>
    'LazyQSpinnerOrbit': LazyComponent<typeof import("quasar")['QSpinnerOrbit']>
    'LazyQSpinnerOval': LazyComponent<typeof import("quasar")['QSpinnerOval']>
    'LazyQSpinnerPie': LazyComponent<typeof import("quasar")['QSpinnerPie']>
    'LazyQSpinnerPuff': LazyComponent<typeof import("quasar")['QSpinnerPuff']>
    'LazyQSpinnerRadio': LazyComponent<typeof import("quasar")['QSpinnerRadio']>
    'LazyQSpinnerRings': LazyComponent<typeof import("quasar")['QSpinnerRings']>
    'LazyQSpinnerTail': LazyComponent<typeof import("quasar")['QSpinnerTail']>
    'LazyQSplitter': LazyComponent<typeof import("quasar")['QSplitter']>
    'LazyQStep': LazyComponent<typeof import("quasar")['QStep']>
    'LazyQStepper': LazyComponent<typeof import("quasar")['QStepper']>
    'LazyQStepperNavigation': LazyComponent<typeof import("quasar")['QStepperNavigation']>
    'LazyQTabPanel': LazyComponent<typeof import("quasar")['QTabPanel']>
    'LazyQTabPanels': LazyComponent<typeof import("quasar")['QTabPanels']>
    'LazyQTable': LazyComponent<typeof import("quasar")['QTable']>
    'LazyQTd': LazyComponent<typeof import("quasar")['QTd']>
    'LazyQTh': LazyComponent<typeof import("quasar")['QTh']>
    'LazyQTr': LazyComponent<typeof import("quasar")['QTr']>
    'LazyQRouteTab': LazyComponent<typeof import("quasar")['QRouteTab']>
    'LazyQTab': LazyComponent<typeof import("quasar")['QTab']>
    'LazyQTabs': LazyComponent<typeof import("quasar")['QTabs']>
    'LazyQTime': LazyComponent<typeof import("quasar")['QTime']>
    'LazyQTimeline': LazyComponent<typeof import("quasar")['QTimeline']>
    'LazyQTimelineEntry': LazyComponent<typeof import("quasar")['QTimelineEntry']>
    'LazyQToggle': LazyComponent<typeof import("quasar")['QToggle']>
    'LazyQToolbar': LazyComponent<typeof import("quasar")['QToolbar']>
    'LazyQToolbarTitle': LazyComponent<typeof import("quasar")['QToolbarTitle']>
    'LazyQTooltip': LazyComponent<typeof import("quasar")['QTooltip']>
    'LazyQTree': LazyComponent<typeof import("quasar")['QTree']>
    'LazyQUploader': LazyComponent<typeof import("quasar")['QUploader']>
    'LazyQUploaderAddTrigger': LazyComponent<typeof import("quasar")['QUploaderAddTrigger']>
    'LazyQVideo': LazyComponent<typeof import("quasar")['QVideo']>
    'LazyQVirtualScroll': LazyComponent<typeof import("quasar")['QVirtualScroll']>
    'LazySiteLink': LazyComponent<typeof import("../node_modules/nuxt-site-config/dist/runtime/nuxt/component/SiteLink.vue")['default']>
    'LazyErrorMessage': LazyComponent<typeof import("vee-validate")['ErrorMessage']>
    'LazyField': LazyComponent<typeof import("vee-validate")['Field']>
    'LazyFieldArray': LazyComponent<typeof import("vee-validate")['FieldArray']>
    'LazyForm': LazyComponent<typeof import("vee-validate")['Form']>
    'LazyNuxtPage': LazyComponent<typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']>
    'LazyNoScript': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
    'LazyLink': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']>
    'LazyBase': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']>
    'LazyTitle': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']>
    'LazyMeta': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']>
    'LazyStyle': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']>
    'LazyHead': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']>
    'LazyHtml': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']>
    'LazyBody': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']>
    'LazyNuxtIsland': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']>
    'LazyNuxtRouteAnnouncer': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
}

declare module 'vue' {
  export interface GlobalComponents extends _GlobalComponents { }
}

export const BookingForm: typeof import("../app/components/BookingForm.vue")['default']
export const CaregiverCard: typeof import("../app/components/CaregiverCard.vue")['default']
export const ConsultationForm: typeof import("../app/components/ConsultationForm.vue")['default']
export const LoginForm: typeof import("../app/components/LoginForm.vue")['default']
export const PaymentForm: typeof import("../app/components/PaymentForm.vue")['default']
export const RegisterForm: typeof import("../app/components/RegisterForm.vue")['default']
export const CommonCaregiverListItem: typeof import("../app/components/common/CaregiverListItem.vue")['default']
export const CommonEmptyState: typeof import("../app/components/common/EmptyState.vue")['default']
export const CommonFilterPanel: typeof import("../app/components/common/FilterPanel.vue")['default']
export const CommonLoadingState: typeof import("../app/components/common/LoadingState.vue")['default']
export const CommonPageHeader: typeof import("../app/components/common/PageHeader.vue")['default']
export const CommonStatCard: typeof import("../app/components/common/StatCard.vue")['default']
export const CommonStatusChip: typeof import("../app/components/common/StatusChip.vue")['default']
export const FormButton: typeof import("../app/components/form/FormButton.vue")['default']
export const FormInput: typeof import("../app/components/form/FormInput.vue")['default']
export const FormPasswordInput: typeof import("../app/components/form/PasswordInput.vue")['default']
export const NuxtWelcome: typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']
export const NuxtLayout: typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
export const NuxtErrorBoundary: typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
export const ClientOnly: typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']
export const DevOnly: typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']
export const ServerPlaceholder: typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
export const NuxtLink: typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']
export const NuxtLoadingIndicator: typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
export const NuxtTime: typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
export const NuxtRouteAnnouncer: typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
export const NuxtImg: typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
export const NuxtPicture: typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
export const VitePwaManifest: typeof import("../node_modules/@vite-pwa/nuxt/dist/runtime/components/VitePwaManifest")['default']
export const NuxtPwaManifest: typeof import("../node_modules/@vite-pwa/nuxt/dist/runtime/components/VitePwaManifest")['default']
export const NuxtPwaAssets: typeof import("../node_modules/@vite-pwa/nuxt/dist/runtime/components/NuxtPwaAssets")['default']
export const PwaAppleImage: typeof import("../node_modules/@vite-pwa/nuxt/dist/runtime/components/PwaAppleImage.vue")['default']
export const PwaAppleSplashScreenImage: typeof import("../node_modules/@vite-pwa/nuxt/dist/runtime/components/PwaAppleSplashScreenImage.vue")['default']
export const PwaFaviconImage: typeof import("../node_modules/@vite-pwa/nuxt/dist/runtime/components/PwaFaviconImage.vue")['default']
export const PwaMaskableImage: typeof import("../node_modules/@vite-pwa/nuxt/dist/runtime/components/PwaMaskableImage.vue")['default']
export const PwaTransparentImage: typeof import("../node_modules/@vite-pwa/nuxt/dist/runtime/components/PwaTransparentImage.vue")['default']
export const NuxtLinkLocale: typeof import("../node_modules/@nuxtjs/i18n/dist/runtime/components/NuxtLinkLocale")['default']
export const SwitchLocalePathLink: typeof import("../node_modules/@nuxtjs/i18n/dist/runtime/components/SwitchLocalePathLink")['default']
export const QAjaxBar: typeof import("quasar")['QAjaxBar']
export const QAvatar: typeof import("quasar")['QAvatar']
export const QBadge: typeof import("quasar")['QBadge']
export const QBanner: typeof import("quasar")['QBanner']
export const QBar: typeof import("quasar")['QBar']
export const QBreadcrumbs: typeof import("quasar")['QBreadcrumbs']
export const QBreadcrumbsEl: typeof import("quasar")['QBreadcrumbsEl']
export const QBtn: typeof import("quasar")['QBtn']
export const QBtnDropdown: typeof import("quasar")['QBtnDropdown']
export const QBtnGroup: typeof import("quasar")['QBtnGroup']
export const QBtnToggle: typeof import("quasar")['QBtnToggle']
export const QCard: typeof import("quasar")['QCard']
export const QCardActions: typeof import("quasar")['QCardActions']
export const QCardSection: typeof import("quasar")['QCardSection']
export const QCarousel: typeof import("quasar")['QCarousel']
export const QCarouselControl: typeof import("quasar")['QCarouselControl']
export const QCarouselSlide: typeof import("quasar")['QCarouselSlide']
export const QChatMessage: typeof import("quasar")['QChatMessage']
export const QCheckbox: typeof import("quasar")['QCheckbox']
export const QChip: typeof import("quasar")['QChip']
export const QCircularProgress: typeof import("quasar")['QCircularProgress']
export const QColor: typeof import("quasar")['QColor']
export const QDate: typeof import("quasar")['QDate']
export const QDialog: typeof import("quasar")['QDialog']
export const QDrawer: typeof import("quasar")['QDrawer']
export const QEditor: typeof import("quasar")['QEditor']
export const QExpansionItem: typeof import("quasar")['QExpansionItem']
export const QFab: typeof import("quasar")['QFab']
export const QFabAction: typeof import("quasar")['QFabAction']
export const QField: typeof import("quasar")['QField']
export const QFile: typeof import("quasar")['QFile']
export const QFooter: typeof import("quasar")['QFooter']
export const QForm: typeof import("quasar")['QForm']
export const QFormChildMixin: typeof import("quasar")['QFormChildMixin']
export const QHeader: typeof import("quasar")['QHeader']
export const QIcon: typeof import("quasar")['QIcon']
export const QImg: typeof import("quasar")['QImg']
export const QInfiniteScroll: typeof import("quasar")['QInfiniteScroll']
export const QInnerLoading: typeof import("quasar")['QInnerLoading']
export const QInput: typeof import("quasar")['QInput']
export const QIntersection: typeof import("quasar")['QIntersection']
export const QItem: typeof import("quasar")['QItem']
export const QItemLabel: typeof import("quasar")['QItemLabel']
export const QItemSection: typeof import("quasar")['QItemSection']
export const QList: typeof import("quasar")['QList']
export const QKnob: typeof import("quasar")['QKnob']
export const QLayout: typeof import("quasar")['QLayout']
export const QLinearProgress: typeof import("quasar")['QLinearProgress']
export const QMarkupTable: typeof import("quasar")['QMarkupTable']
export const QMenu: typeof import("quasar")['QMenu']
export const QNoSsr: typeof import("quasar")['QNoSsr']
export const QOptionGroup: typeof import("quasar")['QOptionGroup']
export const QPage: typeof import("quasar")['QPage']
export const QPageContainer: typeof import("quasar")['QPageContainer']
export const QPageScroller: typeof import("quasar")['QPageScroller']
export const QPageSticky: typeof import("quasar")['QPageSticky']
export const QPagination: typeof import("quasar")['QPagination']
export const QParallax: typeof import("quasar")['QParallax']
export const QPopupEdit: typeof import("quasar")['QPopupEdit']
export const QPopupProxy: typeof import("quasar")['QPopupProxy']
export const QPullToRefresh: typeof import("quasar")['QPullToRefresh']
export const QRadio: typeof import("quasar")['QRadio']
export const QRange: typeof import("quasar")['QRange']
export const QRating: typeof import("quasar")['QRating']
export const QResizeObserver: typeof import("quasar")['QResizeObserver']
export const QResponsive: typeof import("quasar")['QResponsive']
export const QScrollArea: typeof import("quasar")['QScrollArea']
export const QScrollObserver: typeof import("quasar")['QScrollObserver']
export const QSelect: typeof import("quasar")['QSelect']
export const QSeparator: typeof import("quasar")['QSeparator']
export const QSkeleton: typeof import("quasar")['QSkeleton']
export const QSlideItem: typeof import("quasar")['QSlideItem']
export const QSlideTransition: typeof import("quasar")['QSlideTransition']
export const QSlider: typeof import("quasar")['QSlider']
export const QSpace: typeof import("quasar")['QSpace']
export const QSpinner: typeof import("quasar")['QSpinner']
export const QSpinnerAudio: typeof import("quasar")['QSpinnerAudio']
export const QSpinnerBall: typeof import("quasar")['QSpinnerBall']
export const QSpinnerBars: typeof import("quasar")['QSpinnerBars']
export const QSpinnerBox: typeof import("quasar")['QSpinnerBox']
export const QSpinnerClock: typeof import("quasar")['QSpinnerClock']
export const QSpinnerComment: typeof import("quasar")['QSpinnerComment']
export const QSpinnerCube: typeof import("quasar")['QSpinnerCube']
export const QSpinnerDots: typeof import("quasar")['QSpinnerDots']
export const QSpinnerFacebook: typeof import("quasar")['QSpinnerFacebook']
export const QSpinnerGears: typeof import("quasar")['QSpinnerGears']
export const QSpinnerGrid: typeof import("quasar")['QSpinnerGrid']
export const QSpinnerHearts: typeof import("quasar")['QSpinnerHearts']
export const QSpinnerHourglass: typeof import("quasar")['QSpinnerHourglass']
export const QSpinnerInfinity: typeof import("quasar")['QSpinnerInfinity']
export const QSpinnerIos: typeof import("quasar")['QSpinnerIos']
export const QSpinnerOrbit: typeof import("quasar")['QSpinnerOrbit']
export const QSpinnerOval: typeof import("quasar")['QSpinnerOval']
export const QSpinnerPie: typeof import("quasar")['QSpinnerPie']
export const QSpinnerPuff: typeof import("quasar")['QSpinnerPuff']
export const QSpinnerRadio: typeof import("quasar")['QSpinnerRadio']
export const QSpinnerRings: typeof import("quasar")['QSpinnerRings']
export const QSpinnerTail: typeof import("quasar")['QSpinnerTail']
export const QSplitter: typeof import("quasar")['QSplitter']
export const QStep: typeof import("quasar")['QStep']
export const QStepper: typeof import("quasar")['QStepper']
export const QStepperNavigation: typeof import("quasar")['QStepperNavigation']
export const QTabPanel: typeof import("quasar")['QTabPanel']
export const QTabPanels: typeof import("quasar")['QTabPanels']
export const QTable: typeof import("quasar")['QTable']
export const QTd: typeof import("quasar")['QTd']
export const QTh: typeof import("quasar")['QTh']
export const QTr: typeof import("quasar")['QTr']
export const QRouteTab: typeof import("quasar")['QRouteTab']
export const QTab: typeof import("quasar")['QTab']
export const QTabs: typeof import("quasar")['QTabs']
export const QTime: typeof import("quasar")['QTime']
export const QTimeline: typeof import("quasar")['QTimeline']
export const QTimelineEntry: typeof import("quasar")['QTimelineEntry']
export const QToggle: typeof import("quasar")['QToggle']
export const QToolbar: typeof import("quasar")['QToolbar']
export const QToolbarTitle: typeof import("quasar")['QToolbarTitle']
export const QTooltip: typeof import("quasar")['QTooltip']
export const QTree: typeof import("quasar")['QTree']
export const QUploader: typeof import("quasar")['QUploader']
export const QUploaderAddTrigger: typeof import("quasar")['QUploaderAddTrigger']
export const QVideo: typeof import("quasar")['QVideo']
export const QVirtualScroll: typeof import("quasar")['QVirtualScroll']
export const SiteLink: typeof import("../node_modules/nuxt-site-config/dist/runtime/nuxt/component/SiteLink.vue")['default']
export const ErrorMessage: typeof import("vee-validate")['ErrorMessage']
export const Field: typeof import("vee-validate")['Field']
export const FieldArray: typeof import("vee-validate")['FieldArray']
export const Form: typeof import("vee-validate")['Form']
export const NuxtPage: typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']
export const NoScript: typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']
export const Link: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']
export const Base: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']
export const Title: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']
export const Meta: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']
export const Style: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']
export const Head: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']
export const Html: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']
export const Body: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']
export const NuxtIsland: typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']
export const NuxtRouteAnnouncer: typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
export const LazyBookingForm: LazyComponent<typeof import("../app/components/BookingForm.vue")['default']>
export const LazyCaregiverCard: LazyComponent<typeof import("../app/components/CaregiverCard.vue")['default']>
export const LazyConsultationForm: LazyComponent<typeof import("../app/components/ConsultationForm.vue")['default']>
export const LazyLoginForm: LazyComponent<typeof import("../app/components/LoginForm.vue")['default']>
export const LazyPaymentForm: LazyComponent<typeof import("../app/components/PaymentForm.vue")['default']>
export const LazyRegisterForm: LazyComponent<typeof import("../app/components/RegisterForm.vue")['default']>
export const LazyCommonCaregiverListItem: LazyComponent<typeof import("../app/components/common/CaregiverListItem.vue")['default']>
export const LazyCommonEmptyState: LazyComponent<typeof import("../app/components/common/EmptyState.vue")['default']>
export const LazyCommonFilterPanel: LazyComponent<typeof import("../app/components/common/FilterPanel.vue")['default']>
export const LazyCommonLoadingState: LazyComponent<typeof import("../app/components/common/LoadingState.vue")['default']>
export const LazyCommonPageHeader: LazyComponent<typeof import("../app/components/common/PageHeader.vue")['default']>
export const LazyCommonStatCard: LazyComponent<typeof import("../app/components/common/StatCard.vue")['default']>
export const LazyCommonStatusChip: LazyComponent<typeof import("../app/components/common/StatusChip.vue")['default']>
export const LazyFormButton: LazyComponent<typeof import("../app/components/form/FormButton.vue")['default']>
export const LazyFormInput: LazyComponent<typeof import("../app/components/form/FormInput.vue")['default']>
export const LazyFormPasswordInput: LazyComponent<typeof import("../app/components/form/PasswordInput.vue")['default']>
export const LazyNuxtWelcome: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
export const LazyNuxtLayout: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
export const LazyNuxtErrorBoundary: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
export const LazyClientOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']>
export const LazyDevOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']>
export const LazyServerPlaceholder: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
export const LazyNuxtLink: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
export const LazyNuxtLoadingIndicator: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
export const LazyNuxtTime: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
export const LazyNuxtImg: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']>
export const LazyNuxtPicture: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']>
export const LazyVitePwaManifest: LazyComponent<typeof import("../node_modules/@vite-pwa/nuxt/dist/runtime/components/VitePwaManifest")['default']>
export const LazyNuxtPwaManifest: LazyComponent<typeof import("../node_modules/@vite-pwa/nuxt/dist/runtime/components/VitePwaManifest")['default']>
export const LazyNuxtPwaAssets: LazyComponent<typeof import("../node_modules/@vite-pwa/nuxt/dist/runtime/components/NuxtPwaAssets")['default']>
export const LazyPwaAppleImage: LazyComponent<typeof import("../node_modules/@vite-pwa/nuxt/dist/runtime/components/PwaAppleImage.vue")['default']>
export const LazyPwaAppleSplashScreenImage: LazyComponent<typeof import("../node_modules/@vite-pwa/nuxt/dist/runtime/components/PwaAppleSplashScreenImage.vue")['default']>
export const LazyPwaFaviconImage: LazyComponent<typeof import("../node_modules/@vite-pwa/nuxt/dist/runtime/components/PwaFaviconImage.vue")['default']>
export const LazyPwaMaskableImage: LazyComponent<typeof import("../node_modules/@vite-pwa/nuxt/dist/runtime/components/PwaMaskableImage.vue")['default']>
export const LazyPwaTransparentImage: LazyComponent<typeof import("../node_modules/@vite-pwa/nuxt/dist/runtime/components/PwaTransparentImage.vue")['default']>
export const LazyNuxtLinkLocale: LazyComponent<typeof import("../node_modules/@nuxtjs/i18n/dist/runtime/components/NuxtLinkLocale")['default']>
export const LazySwitchLocalePathLink: LazyComponent<typeof import("../node_modules/@nuxtjs/i18n/dist/runtime/components/SwitchLocalePathLink")['default']>
export const LazyQAjaxBar: LazyComponent<typeof import("quasar")['QAjaxBar']>
export const LazyQAvatar: LazyComponent<typeof import("quasar")['QAvatar']>
export const LazyQBadge: LazyComponent<typeof import("quasar")['QBadge']>
export const LazyQBanner: LazyComponent<typeof import("quasar")['QBanner']>
export const LazyQBar: LazyComponent<typeof import("quasar")['QBar']>
export const LazyQBreadcrumbs: LazyComponent<typeof import("quasar")['QBreadcrumbs']>
export const LazyQBreadcrumbsEl: LazyComponent<typeof import("quasar")['QBreadcrumbsEl']>
export const LazyQBtn: LazyComponent<typeof import("quasar")['QBtn']>
export const LazyQBtnDropdown: LazyComponent<typeof import("quasar")['QBtnDropdown']>
export const LazyQBtnGroup: LazyComponent<typeof import("quasar")['QBtnGroup']>
export const LazyQBtnToggle: LazyComponent<typeof import("quasar")['QBtnToggle']>
export const LazyQCard: LazyComponent<typeof import("quasar")['QCard']>
export const LazyQCardActions: LazyComponent<typeof import("quasar")['QCardActions']>
export const LazyQCardSection: LazyComponent<typeof import("quasar")['QCardSection']>
export const LazyQCarousel: LazyComponent<typeof import("quasar")['QCarousel']>
export const LazyQCarouselControl: LazyComponent<typeof import("quasar")['QCarouselControl']>
export const LazyQCarouselSlide: LazyComponent<typeof import("quasar")['QCarouselSlide']>
export const LazyQChatMessage: LazyComponent<typeof import("quasar")['QChatMessage']>
export const LazyQCheckbox: LazyComponent<typeof import("quasar")['QCheckbox']>
export const LazyQChip: LazyComponent<typeof import("quasar")['QChip']>
export const LazyQCircularProgress: LazyComponent<typeof import("quasar")['QCircularProgress']>
export const LazyQColor: LazyComponent<typeof import("quasar")['QColor']>
export const LazyQDate: LazyComponent<typeof import("quasar")['QDate']>
export const LazyQDialog: LazyComponent<typeof import("quasar")['QDialog']>
export const LazyQDrawer: LazyComponent<typeof import("quasar")['QDrawer']>
export const LazyQEditor: LazyComponent<typeof import("quasar")['QEditor']>
export const LazyQExpansionItem: LazyComponent<typeof import("quasar")['QExpansionItem']>
export const LazyQFab: LazyComponent<typeof import("quasar")['QFab']>
export const LazyQFabAction: LazyComponent<typeof import("quasar")['QFabAction']>
export const LazyQField: LazyComponent<typeof import("quasar")['QField']>
export const LazyQFile: LazyComponent<typeof import("quasar")['QFile']>
export const LazyQFooter: LazyComponent<typeof import("quasar")['QFooter']>
export const LazyQForm: LazyComponent<typeof import("quasar")['QForm']>
export const LazyQFormChildMixin: LazyComponent<typeof import("quasar")['QFormChildMixin']>
export const LazyQHeader: LazyComponent<typeof import("quasar")['QHeader']>
export const LazyQIcon: LazyComponent<typeof import("quasar")['QIcon']>
export const LazyQImg: LazyComponent<typeof import("quasar")['QImg']>
export const LazyQInfiniteScroll: LazyComponent<typeof import("quasar")['QInfiniteScroll']>
export const LazyQInnerLoading: LazyComponent<typeof import("quasar")['QInnerLoading']>
export const LazyQInput: LazyComponent<typeof import("quasar")['QInput']>
export const LazyQIntersection: LazyComponent<typeof import("quasar")['QIntersection']>
export const LazyQItem: LazyComponent<typeof import("quasar")['QItem']>
export const LazyQItemLabel: LazyComponent<typeof import("quasar")['QItemLabel']>
export const LazyQItemSection: LazyComponent<typeof import("quasar")['QItemSection']>
export const LazyQList: LazyComponent<typeof import("quasar")['QList']>
export const LazyQKnob: LazyComponent<typeof import("quasar")['QKnob']>
export const LazyQLayout: LazyComponent<typeof import("quasar")['QLayout']>
export const LazyQLinearProgress: LazyComponent<typeof import("quasar")['QLinearProgress']>
export const LazyQMarkupTable: LazyComponent<typeof import("quasar")['QMarkupTable']>
export const LazyQMenu: LazyComponent<typeof import("quasar")['QMenu']>
export const LazyQNoSsr: LazyComponent<typeof import("quasar")['QNoSsr']>
export const LazyQOptionGroup: LazyComponent<typeof import("quasar")['QOptionGroup']>
export const LazyQPage: LazyComponent<typeof import("quasar")['QPage']>
export const LazyQPageContainer: LazyComponent<typeof import("quasar")['QPageContainer']>
export const LazyQPageScroller: LazyComponent<typeof import("quasar")['QPageScroller']>
export const LazyQPageSticky: LazyComponent<typeof import("quasar")['QPageSticky']>
export const LazyQPagination: LazyComponent<typeof import("quasar")['QPagination']>
export const LazyQParallax: LazyComponent<typeof import("quasar")['QParallax']>
export const LazyQPopupEdit: LazyComponent<typeof import("quasar")['QPopupEdit']>
export const LazyQPopupProxy: LazyComponent<typeof import("quasar")['QPopupProxy']>
export const LazyQPullToRefresh: LazyComponent<typeof import("quasar")['QPullToRefresh']>
export const LazyQRadio: LazyComponent<typeof import("quasar")['QRadio']>
export const LazyQRange: LazyComponent<typeof import("quasar")['QRange']>
export const LazyQRating: LazyComponent<typeof import("quasar")['QRating']>
export const LazyQResizeObserver: LazyComponent<typeof import("quasar")['QResizeObserver']>
export const LazyQResponsive: LazyComponent<typeof import("quasar")['QResponsive']>
export const LazyQScrollArea: LazyComponent<typeof import("quasar")['QScrollArea']>
export const LazyQScrollObserver: LazyComponent<typeof import("quasar")['QScrollObserver']>
export const LazyQSelect: LazyComponent<typeof import("quasar")['QSelect']>
export const LazyQSeparator: LazyComponent<typeof import("quasar")['QSeparator']>
export const LazyQSkeleton: LazyComponent<typeof import("quasar")['QSkeleton']>
export const LazyQSlideItem: LazyComponent<typeof import("quasar")['QSlideItem']>
export const LazyQSlideTransition: LazyComponent<typeof import("quasar")['QSlideTransition']>
export const LazyQSlider: LazyComponent<typeof import("quasar")['QSlider']>
export const LazyQSpace: LazyComponent<typeof import("quasar")['QSpace']>
export const LazyQSpinner: LazyComponent<typeof import("quasar")['QSpinner']>
export const LazyQSpinnerAudio: LazyComponent<typeof import("quasar")['QSpinnerAudio']>
export const LazyQSpinnerBall: LazyComponent<typeof import("quasar")['QSpinnerBall']>
export const LazyQSpinnerBars: LazyComponent<typeof import("quasar")['QSpinnerBars']>
export const LazyQSpinnerBox: LazyComponent<typeof import("quasar")['QSpinnerBox']>
export const LazyQSpinnerClock: LazyComponent<typeof import("quasar")['QSpinnerClock']>
export const LazyQSpinnerComment: LazyComponent<typeof import("quasar")['QSpinnerComment']>
export const LazyQSpinnerCube: LazyComponent<typeof import("quasar")['QSpinnerCube']>
export const LazyQSpinnerDots: LazyComponent<typeof import("quasar")['QSpinnerDots']>
export const LazyQSpinnerFacebook: LazyComponent<typeof import("quasar")['QSpinnerFacebook']>
export const LazyQSpinnerGears: LazyComponent<typeof import("quasar")['QSpinnerGears']>
export const LazyQSpinnerGrid: LazyComponent<typeof import("quasar")['QSpinnerGrid']>
export const LazyQSpinnerHearts: LazyComponent<typeof import("quasar")['QSpinnerHearts']>
export const LazyQSpinnerHourglass: LazyComponent<typeof import("quasar")['QSpinnerHourglass']>
export const LazyQSpinnerInfinity: LazyComponent<typeof import("quasar")['QSpinnerInfinity']>
export const LazyQSpinnerIos: LazyComponent<typeof import("quasar")['QSpinnerIos']>
export const LazyQSpinnerOrbit: LazyComponent<typeof import("quasar")['QSpinnerOrbit']>
export const LazyQSpinnerOval: LazyComponent<typeof import("quasar")['QSpinnerOval']>
export const LazyQSpinnerPie: LazyComponent<typeof import("quasar")['QSpinnerPie']>
export const LazyQSpinnerPuff: LazyComponent<typeof import("quasar")['QSpinnerPuff']>
export const LazyQSpinnerRadio: LazyComponent<typeof import("quasar")['QSpinnerRadio']>
export const LazyQSpinnerRings: LazyComponent<typeof import("quasar")['QSpinnerRings']>
export const LazyQSpinnerTail: LazyComponent<typeof import("quasar")['QSpinnerTail']>
export const LazyQSplitter: LazyComponent<typeof import("quasar")['QSplitter']>
export const LazyQStep: LazyComponent<typeof import("quasar")['QStep']>
export const LazyQStepper: LazyComponent<typeof import("quasar")['QStepper']>
export const LazyQStepperNavigation: LazyComponent<typeof import("quasar")['QStepperNavigation']>
export const LazyQTabPanel: LazyComponent<typeof import("quasar")['QTabPanel']>
export const LazyQTabPanels: LazyComponent<typeof import("quasar")['QTabPanels']>
export const LazyQTable: LazyComponent<typeof import("quasar")['QTable']>
export const LazyQTd: LazyComponent<typeof import("quasar")['QTd']>
export const LazyQTh: LazyComponent<typeof import("quasar")['QTh']>
export const LazyQTr: LazyComponent<typeof import("quasar")['QTr']>
export const LazyQRouteTab: LazyComponent<typeof import("quasar")['QRouteTab']>
export const LazyQTab: LazyComponent<typeof import("quasar")['QTab']>
export const LazyQTabs: LazyComponent<typeof import("quasar")['QTabs']>
export const LazyQTime: LazyComponent<typeof import("quasar")['QTime']>
export const LazyQTimeline: LazyComponent<typeof import("quasar")['QTimeline']>
export const LazyQTimelineEntry: LazyComponent<typeof import("quasar")['QTimelineEntry']>
export const LazyQToggle: LazyComponent<typeof import("quasar")['QToggle']>
export const LazyQToolbar: LazyComponent<typeof import("quasar")['QToolbar']>
export const LazyQToolbarTitle: LazyComponent<typeof import("quasar")['QToolbarTitle']>
export const LazyQTooltip: LazyComponent<typeof import("quasar")['QTooltip']>
export const LazyQTree: LazyComponent<typeof import("quasar")['QTree']>
export const LazyQUploader: LazyComponent<typeof import("quasar")['QUploader']>
export const LazyQUploaderAddTrigger: LazyComponent<typeof import("quasar")['QUploaderAddTrigger']>
export const LazyQVideo: LazyComponent<typeof import("quasar")['QVideo']>
export const LazyQVirtualScroll: LazyComponent<typeof import("quasar")['QVirtualScroll']>
export const LazySiteLink: LazyComponent<typeof import("../node_modules/nuxt-site-config/dist/runtime/nuxt/component/SiteLink.vue")['default']>
export const LazyErrorMessage: LazyComponent<typeof import("vee-validate")['ErrorMessage']>
export const LazyField: LazyComponent<typeof import("vee-validate")['Field']>
export const LazyFieldArray: LazyComponent<typeof import("vee-validate")['FieldArray']>
export const LazyForm: LazyComponent<typeof import("vee-validate")['Form']>
export const LazyNuxtPage: LazyComponent<typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']>
export const LazyNoScript: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
export const LazyLink: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']>
export const LazyBase: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']>
export const LazyTitle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']>
export const LazyMeta: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']>
export const LazyStyle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']>
export const LazyHead: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']>
export const LazyHtml: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']>
export const LazyBody: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']>
export const LazyNuxtIsland: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>

export const componentNames: string[]
