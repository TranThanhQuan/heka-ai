<template>

    <Head title="Calorie Counter Survey" />

    <!-- Floating Background Elements -->
    <div class="floating-elements">
        <div class="floating-circle w-20 h-20 top-10 left-10" style="animation-delay: 0s;"></div>
        <div class="floating-circle w-32 h-32 top-1/4 right-20" style="animation-delay: 2s;"></div>
        <div class="floating-circle w-16 h-16 bottom-20 left-1/4" style="animation-delay: 4s;"></div>
        <div class="floating-circle w-24 h-24 bottom-10 right-10" style="animation-delay: 1s;"></div>
    </div>

    <!-- Header with Logo and Language Selector -->
    <div class="fixed top-0 left-0 w-full z-50 p-4 bg-white border-b border-gray-200 shadow-sm">
        <div class="flex justify-between items-center">
            <!-- Logo Left -->
            <div class="w-32 h-8">
                <img src="https://heka.astronex.ai/images/logo.svg" alt="Heka AI" class="w-full h-full object-contain">
            </div>

            <!-- Language Selector Right -->
            <div class="relative">
                <button id="languageBtn"
                    class="flex items-center space-x-2 bg-gray-100 rounded-xl px-3 py-2 text-gray-700 hover:bg-gray-200 transition-all"
                    onclick="toggleLanguageMenu()">
                    <span class="text-lg">🇻🇳</span>
                    <span class="text-sm font-medium">VI</span>
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </button>

                <!-- Language Dropdown -->
                <div id="languageMenu"
                    class="absolute right-0 top-12 bg-white rounded-2xl shadow-2xl border border-gray-200 py-2 w-48 hidden z-50">
                    <button class="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-3"
                        onclick="changeLanguage('vi', '🇻🇳', 'VI')">
                        <span class="text-lg">🇻🇳</span>
                        <span class="text-gray-800 font-medium">Tiếng Việt</span>
                    </button>
                    <button class="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-3"
                        onclick="changeLanguage('en', '🇺🇸', 'EN')">
                        <span class="text-lg">🇺🇸</span>
                        <span class="text-gray-800 font-medium">English</span>
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Progress Bar -->
    <div class="fixed top-20 left-0 w-full h-1 bg-white bg-opacity-20 z-10">
        <div id="progressBar" class="progress-bar h-full" style="width: 3.33%"></div>
    </div>

    <!-- Question Screens -->
    <div id="questionContainer" class="question-container fade-in">
        <!-- Question 1 -->
        <div id="question1" class="w-full max-w-lg mx-auto text-center">
            <div class="card rounded-3xl p-8 shadow-2xl">
                <div class="mb-8">
                    <div class="w-48 h-48 mx-auto mb-6 flex items-center justify-center">
                        <img src="https://heka.tranthanhquan.com/images/onboarding/gif/goal_welcome.gif" alt="Welcome"
                            class="w-full h-full object-contain rounded-2xl">
                    </div>
                            <h1 v-html="$t('welcome_screen.text')" class="text-3xl font-normal text-gray-800 mb-4"></h1>
                </div>
                <button class="cta-button w-full py-4 text-white font-semibold rounded-2xl text-lg"
                    onclick="nextQuestion()">
                    {{ $t('welcome_screen.next_btn') }}
                </button>
            </div>
        </div>

        <!-- Question 2 - Branding Page -->
        <div id="question2" class="w-full max-w-lg mx-auto text-center hidden">
            <div class="card rounded-3xl p-8 shadow-2xl">
                <div class="mb-8">
                    <div
                        class="w-20 h-20 bg-gradient-to-r from-gray-600 to-gray-800 rounded-3xl mx-auto mb-6 flex items-center justify-center">
                        <span class="text-3xl">🏆</span>
                    </div>
                    <h2 class="text-2xl font-bold text-gray-800 mb-6">{{ $t('branding_screen.title') }}</h2>

                    <!-- Trust Indicators -->
                    <div class="space-y-4 mb-8">
                        <!-- Rating -->
                        <div class="flex items-center justify-center space-x-2">
                            <div class="flex space-x-1">
                                <span class="text-yellow-400 text-xl">⭐</span>
                                <span class="text-yellow-400 text-xl">⭐</span>
                                <span class="text-yellow-400 text-xl">⭐</span>
                                <span class="text-yellow-400 text-xl">⭐</span>
                                <span class="text-yellow-400 text-xl">⭐</span>
                            </div>
                            <span class="text-2xl font-bold text-gray-800">4.8/5</span>
                        </div>

                        <!-- App Store Badges -->
                        <div class="flex justify-center space-x-4">
                            <div class="flex items-center space-x-2 bg-gray-100 rounded-xl px-4 py-2">
                                <span class="text-2xl">📱</span>
                                <span class="text-sm font-medium text-gray-700">App Store</span>
                            </div>
                            <div class="flex items-center space-x-2 bg-gray-100 rounded-xl px-4 py-2">
                                <span class="text-2xl">🤖</span>
                                <span class="text-sm font-medium text-gray-700">Google Play</span>
                            </div>
                        </div>

                        <!-- User Count -->
                        <div class="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-4">
                            <div class="text-3xl font-bold text-gray-800 mb-1">1M+</div>
                            <div class="text-sm text-gray-600">{{ $t('branding_screen.description') }}</div>
                        </div>
                    </div>
                </div>

                <button class="cta-button w-full py-4 text-white font-semibold rounded-2xl text-lg"
                    onclick="nextQuestion()">
                    {{ $t('branding_screen.next_btn') }}
                </button>
            </div>
        </div>

        <!-- Question 3 - AI Technology Page -->
        <div id="question3" class="w-full max-w-lg mx-auto text-center hidden">
            <div class="card rounded-3xl p-8 shadow-2xl">
                <div class="mb-8">
                    <div
                        class="w-20 h-20 bg-gradient-to-r from-gray-700 to-black rounded-3xl mx-auto mb-6 flex items-center justify-center">
                        <span class="text-3xl">🤖</span>
                    </div>
                    <h2 class="text-2xl font-bold text-gray-800 mb-6">{{ $t('ai_tech_screen.title') }}</h2>

                    <!-- AI Features -->
                    <div class="space-y-4 mb-8">
                        <!-- Accuracy -->
                        <div class="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-4">
                            <div class="text-3xl font-bold text-gray-800 mb-1">99%</div>
                            <div class="text-sm text-gray-600">{{ $t('ai_tech_screen.description') }}</div>
                        </div>

                        <!-- Speed and Touch - Balanced Layout -->
                        <div class="grid grid-cols-2 gap-3">
                            <div class="highlight-box">
                                <div class="text-2xl font-bold">🚀 {{ $t('ai_tech_screen.box.left.title') }}</div>
                                <div class="text-xs mt-1">{{ $t('ai_tech_screen.box.left.description') }}</div>
                            </div>
                            <div class="highlight-box-green">
                                <div class="text-2xl font-bold">👆 {{ $t('ai_tech_screen.box.right.title') }}</div>
                                <div class="text-xs mt-1">{{ $t('ai_tech_screen.box.right.description') }}</div>
                            </div>
                        </div>

                        <!-- Feature List -->
                        <div class="text-left space-y-2">
                            <div class="flex items-center">
                                <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3">
                                    <span class="text-white text-sm">✓</span>
                                </div>
                                <span class="text-sm text-gray-700">{{ $t('ai_tech_screen.feature.feature_1') }}</span>
                            </div>
                            <div class="flex items-center">
                                <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3">
                                    <span class="text-white text-sm">✓</span>
                                </div>
                                <span class="text-sm text-gray-700">{{ $t('ai_tech_screen.feature.feature_2') }}</span>
                            </div>
                            <div class="flex items-center">
                                <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3">
                                    <span class="text-white text-sm">✓</span>
                                </div>
                                <span class="text-sm text-gray-700">{{ $t('ai_tech_screen.feature.feature_3') }}</span>
                            </div>
                            <div class="flex items-center">
                                <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3">
                                    <span class="text-white text-sm">✓</span>
                                </div>
                                <span class="text-sm text-gray-700">{{ $t('ai_tech_screen.feature.feature_4') }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <button class="cta-button w-full py-4 text-white font-semibold rounded-2xl text-lg"
                    onclick="nextQuestion()">
                    {{ $t('ai_tech_screen.next_btn') }}
                </button>
            </div>
        </div>

        <!-- Question 4 - Body Status -->
        <div id="question4" class="w-full max-w-lg mx-auto px-4 hidden">
            <div class="card rounded-3xl p-8 shadow-2xl">
                <div class="mb-8 text-center">
                    <h2 class="text-2xl font-bold text-gray-800 mb-3">{{ $t('body_status_screen.title') }}</h2>
                    <p class="text-gray-600">{{ $t('body_status_screen.description') }}</p>
                </div>

                <div class="w-full space-y-3">
                    <button
                        class="option-button w-full p-4 rounded-2xl text-gray-800 font-medium text-left flex items-center"
                        onclick="nextQuestion()">
                        <span class="text-2xl mr-4">🦴</span>
                        <span>{{ $t('body_status_screen.status.status_1') }}</span>
                    </button>
                    <button
                        class="option-button w-full p-4 rounded-2xl text-gray-800 font-medium text-left flex items-center"
                        onclick="nextQuestion()">
                        <span class="text-2xl mr-4">🫃</span>
                        <span>{{ $t('body_status_screen.status.status_2') }}</span>
                    </button>
                    <button
                        class="option-button w-full p-4 rounded-2xl text-gray-800 font-medium text-left flex items-center"
                        onclick="nextQuestion()">
                        <span class="text-2xl mr-4">🌿</span>
                        <span>{{ $t('body_status_screen.status.status_3') }}</span>
                    </button>
                    <button
                        class="option-button w-full p-4 rounded-2xl text-gray-800 font-medium text-left flex items-center"
                        onclick="nextQuestion()">
                        <span class="text-2xl mr-4">🤔</span>
                        <span>{{ $t('body_status_screen.status.status_4') }}</span>
                    </button>
                </div>
            </div>
        </div>

        <!-- Question 5 - Current Concerns -->
        <div id="question5" class="w-full max-w-lg mx-auto px-4 hidden">
            <div class="card rounded-3xl p-8 shadow-2xl">
                <div class="mb-8 text-center">
                    <h2 class="text-2xl font-bold text-gray-800 mb-3">{{ $t('concern_screen.title') }}</h2>
                    <p class="text-gray-600">{{ $t('concern_screen.description') }}</p>
                </div>

                <div class="w-full space-y-3">
                    <button
                        class="option-button w-full p-4 rounded-2xl text-gray-800 font-medium text-left flex items-center"
                        onclick="nextQuestion()">
                        <span class="text-2xl mr-4">💪</span>
                        <span>{{ $t('concern_screen.concern.concern_1') }}</span>
                    </button>
                    <button
                        class="option-button w-full p-4 rounded-2xl text-gray-800 font-medium text-left flex items-center"
                        onclick="nextQuestion()">
                        <span class="text-2xl mr-4">😰</span>
                        <span>{{ $t('concern_screen.concern.concern_2') }}</span>
                    </button>
                    <button
                        class="option-button w-full p-4 rounded-2xl text-gray-800 font-medium text-left flex items-center"
                        onclick="nextQuestion()">
                        <span class="text-2xl mr-4">😴</span>
                        <span>{{ $t('concern_screen.concern.concern_3') }}</span>
                    </button>
                    <button
                        class="option-button w-full p-4 rounded-2xl text-gray-800 font-medium text-left flex items-center"
                        onclick="nextQuestion()">
                        <span class="text-2xl mr-4">🌙</span>
                        <span>{{ $t('concern_screen.concern.concern_4') }}</span>
                    </button>
                    <button
                        class="option-button w-full p-4 rounded-2xl text-gray-800 font-medium text-left flex items-center"
                        onclick="nextQuestion()">
                        <span class="text-2xl mr-4">🤗</span>
                        <span>{{ $t('concern_screen.concern.concern_5') }}</span>
                    </button>
                </div>
            </div>
        </div>

        <!-- Question 6 - Motivation Page -->
        <div id="question6" class="w-full max-w-lg mx-auto text-center hidden">
            <div class="card rounded-3xl p-8 shadow-2xl">
                <div class="mb-8">
                    <div
                        class="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl mx-auto mb-6 flex items-center justify-center">
                        <span class="text-3xl">💚</span>
                    </div>
                    <h2 class="text-2xl font-bold text-gray-800 mb-6">{{ $t('motivation_screen.title') }}</h2>

                    <div class="text-left space-y-4 mb-8">
                        <p v-html=" $t('motivation_screen.description_1') " class="text-gray-700 leading-relaxed">
                        </p>
                        <p v-html=" $t('motivation_screen.description_2') " class="text-gray-700 leading-relaxed">
                        </p>

                        <!-- Success Stats -->
                        <div class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4 mt-6">
                            <div class="grid grid-cols-2 gap-4 text-center">
                                <div>
                                        <div class="text-2xl font-bold text-green-600">{{ $t('motivation_screen.box.left.title')
                                            }}</div>
                                    <div class="text-xs text-gray-600">{{ $t('motivation_screen.box.left.description')
                                        }}</div>
                                </div>
                                <div>
                                    <div class="text-2xl font-bold text-green-600">{{ $t('motivation_screen.box.right.title')
                                        }}</div>
                                    <div class="text-xs text-gray-600">{{ $t('motivation_screen.box.right.description')
                                        }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <button class="cta-button w-full py-4 text-white font-semibold rounded-2xl text-lg"
                    onclick="nextQuestion()">
                    {{ $t('motivation_screen.next_btn') }}
                </button>
            </div>
        </div>

        <!-- Question 7 - Main Goal -->
        <div id="question7" class="w-full max-w-lg mx-auto px-4 hidden">
            <div class="card rounded-3xl p-8 shadow-2xl">
                <div class="mb-8 text-center">
                    <h2 class="text-2xl font-bold text-gray-800 mb-3">{{ $t('main_goal_screen.title') }}</h2>
                    <p class="text-gray-600">{{ $t('main_goal_screen.description') }}</p>
                </div>

                <div class="w-full space-y-3">
                    <button
                        class="option-button w-full p-4 rounded-2xl text-gray-800 font-medium text-left flex items-center"
                        onclick="selectGoal('lose_weight')">
                        <span class="text-2xl mr-4">📉</span>
                        <span>{{ $t('main_goal_screen.goal.goal_1') }}</span>
                    </button>
                    <button
                        class="option-button w-full p-4 rounded-2xl text-gray-800 font-medium text-left flex items-center"
                        onclick="selectGoal('maintain_weight')">
                        <span class="text-2xl mr-4">⚖️</span>
                        <span>{{ $t('main_goal_screen.goal.goal_2') }}</span>
                    </button>
                    <button
                        class="option-button w-full p-4 rounded-2xl text-gray-800 font-medium text-left flex items-center"
                        onclick="selectGoal('gain_weight')">
                        <span class="text-2xl mr-4">📈</span>
                        <span>{{ $t('main_goal_screen.goal.goal_3') }}</span>
                    </button>
                    <button
                        class="option-button w-full p-4 rounded-2xl text-gray-800 font-medium text-left flex items-center"
                        onclick="selectGoal('healthy_eating')">
                        <span class="text-2xl mr-4">🥗</span>
                        <span>{{ $t('main_goal_screen.goal.goal_4') }}</span>
                    </button>
                </div>
            </div>
        </div>

        <!-- Question 8 - Age -->
        <div id="question8" class="w-full max-w-lg mx-auto px-4 hidden">
            <div class="card rounded-3xl p-8 shadow-2xl">
                <div class="mb-8 text-center">
                    <h2 class="text-2xl font-bold text-gray-800 mb-3">{{ $t('age_screen.title') }}</h2>
                    <p class="text-gray-600">{{ $t('age_screen.description') }}</p>
                </div>

                <div class="w-full space-y-3">
                    <button class="option-button w-full p-4 rounded-2xl text-gray-800 font-medium"
                        onclick="nextQuestion()">{{ $t('age_screen.age.age_1') }}</button>
                    <button class="option-button w-full p-4 rounded-2xl text-gray-800 font-medium"
                        onclick="nextQuestion()">{{ $t('age_screen.age.age_2') }}</button>
                    <button class="option-button w-full p-4 rounded-2xl text-gray-800 font-medium"
                        onclick="nextQuestion()">{{ $t('age_screen.age.age_3') }}</button>
                    <button class="option-button w-full p-4 rounded-2xl text-gray-800 font-medium"
                        onclick="nextQuestion()">{{ $t('age_screen.age.age_4') }}</button>
                </div>
            </div>
        </div>

        <!-- Question 9 - Gender -->
        <div id="question9" class="w-full max-w-lg mx-auto px-4 hidden">
            <div class="card rounded-3xl p-8 shadow-2xl">
                <div class="mb-8 text-center">
                    <h2 class="text-2xl font-bold text-gray-800 mb-3">{{ $t('gender_screen.title') }}</h2>
                    <p class="text-gray-600">{{ $t('gender_screen.description') }}</p>
                </div>

                <div class="w-full space-y-3">
                    <button
                        class="option-button w-full p-4 rounded-2xl text-gray-800 font-medium text-left flex items-center"
                        onclick="nextQuestion()">
                        <span class="text-2xl mr-4">👨</span>
                        <span>{{ $t('gender_screen.gender.male') }}</span>
                    </button>
                    <button
                        class="option-button w-full p-4 rounded-2xl text-gray-800 font-medium text-left flex items-center"
                        onclick="nextQuestion()">
                        <span class="text-2xl mr-4">👩</span>
                        <span>{{ $t('gender_screen.gender.female') }}</span>
                    </button>
                    <button
                        class="option-button w-full p-4 rounded-2xl text-gray-800 font-medium text-left flex items-center"
                        onclick="nextQuestion()">
                        <span class="text-2xl mr-4">🏳️‍⚧️</span>
                        <span>{{ $t('gender_screen.gender.other') }}</span>
                    </button>
                </div>
            </div>
        </div>

        <!-- Question 10 - Height and Weight Input -->
        <div id="question10" class="w-full max-w-lg mx-auto px-4 hidden">
            <div class="card rounded-3xl p-8 shadow-2xl">
                <div class="mb-8 text-center">
                    <h2 class="text-2xl font-bold text-gray-800 mb-3">{{ $t('height_weight_screen.title') }}</h2>
                    <p class="text-gray-600">{{ $t('height_weight_screen.description') }}</p>
                </div>

                <div class="w-full">
                    <!-- Unit Toggle -->
                    <div class="flex justify-center mb-6">
                        <div class="bg-gray-100 rounded-2xl p-1 flex">
                            <button id="metricBtn"
                                class="px-4 py-2 rounded-xl text-sm font-medium transition-all bg-white text-gray-800 shadow-sm"
                                onclick="toggleUnit('metric')">
                                {{ $t('height_weight_screen.mesure_type.metric') }}
                            </button>
                            <button id="imperialBtn"
                                class="px-4 py-2 rounded-xl text-sm font-medium transition-all text-gray-600"
                                onclick="toggleUnit('imperial')">
                                {{ $t('height_weight_screen.mesure_type.imperial') }}
                            </button>
                        </div>
                    </div>

                    <!-- Metric Inputs -->
                    <div id="metricInputs" class="space-y-4">
                        <div class="relative">
                            <label class="block text-sm font-medium text-gray-700 mb-2 text-left">{{ $t('height_weight_screen.height.title') }}</label>
                            <input type="number" id="heightCm"
                                class="w-full p-4 rounded-2xl border-2 border-gray-200 text-center text-xl font-semibold focus:border-gray-600 focus:outline-none"
                                placeholder="170" min="100" max="250">
                            <span
                                class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium mt-3">cm</span>
                            <div id="heightError" class="error-message hidden">{{ $t('height_weight_screen.error_message') }}</div>
                        </div>
                        <div class="relative">
                            <label class="block text-sm font-medium text-gray-700 mb-2 text-left">{{ $t('height_weight_screen.weight.title') }}</label>
                            <input type="number" id="currentWeightKg"
                                class="w-full p-4 rounded-2xl border-2 border-gray-200 text-center text-xl font-semibold focus:border-gray-600 focus:outline-none"
                                placeholder="65" min="30" max="300" step="0.1">
                            <span
                                class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium mt-3">kg</span>
                            <div id="weightError" class="error-message hidden">{{ $t('height_weight_screen.error_message') }}</div>
                        </div>
                    </div>

                    <!-- Imperial Inputs -->
                    <div id="imperialInputs" class="space-y-4 hidden">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2 text-left">{{ $t('height_weight_screen.height.title') }}</label>
                            <div class="flex space-x-3">
                                <div class="relative flex-1">
                                    <input type="number" id="heightFt"
                                        class="w-full p-4 rounded-2xl border-2 border-gray-200 text-center text-xl font-semibold focus:border-gray-600 focus:outline-none"
                                        placeholder="5" min="3" max="8">
                                    <span
                                        class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">ft</span>
                                </div>
                                <div class="relative flex-1">
                                    <input type="number" id="heightIn"
                                        class="w-full p-4 rounded-2xl border-2 border-gray-200 text-center text-xl font-semibold focus:border-gray-600 focus:outline-none"
                                        placeholder="7" min="0" max="11">
                                    <span
                                        class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">in</span>
                                </div>
                            </div>
                            <div id="heightImperialError" class="error-message hidden">{{ $t('height_weight_screen.error_message') }}</div>
                        </div>
                        <div class="relative">
                            <label class="block text-sm font-medium text-gray-700 mb-2 text-left">{{ $t('height_weight_screen.weight.title') }}</label>
                            <input type="number" id="currentWeightLbs"
                                class="w-full p-4 rounded-2xl border-2 border-gray-200 text-center text-xl font-semibold focus:border-gray-600 focus:outline-none"
                                placeholder="143" min="66" max="660" step="0.1">
                            <span
                                class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium mt-3">lbs</span>
                            <div id="weightImperialError" class="error-message hidden">{{ $t('height_weight_screen.error_message') }}</div>
                        </div>
                    </div>

                    <button class="cta-button w-full py-4 text-white font-semibold rounded-2xl text-lg mt-6"
                        onclick="validateHeightWeight()">
                        {{ $t('height_weight_screen.next_btn') }}
                    </button>
                </div>
            </div>
        </div>

        <!-- Question 11 - BMI Display & Target Weight -->
        <div id="question11" class="w-full max-w-lg mx-auto px-4 hidden">
            <div class="card rounded-3xl p-8 shadow-2xl">
                <div class="mb-8 text-center">
                    <h2 class="text-2xl font-bold text-gray-800 mb-4">{{ $t('goal_weight_screen.BMI.title') }}</h2>

                    <!-- BMI Display -->
                    <div id="bmiQuote" class="bg-white rounded-xl p-4 border-l-4 border-gray-400 mb-6">
                        <div class="text-3xl font-bold text-gray-800 mb-2" id="bmiValue">0</div>
                        <div class="text-base font-semibold text-gray-700 mb-1" id="bmiCategory">{{ $t('goal_weight_screen.BMI.calculating') }}</div>
                        <div class="text-xs text-gray-600 mb-3" id="bmiDescription">{{ $t('goal_weight_screen.BMI.text') }}</div>
                        <div class="text-sm text-gray-700 italic" id="bmiQuoteText">{{ $t('goal_weight_screen.BMI.analying') }}</div>
                        <div class="text-xs text-gray-500 mt-2">{{ $t('goal_weight_screen.BMI.reference') }}</div>
                    </div>

                    <h3 class="text-xl font-bold text-gray-800 mb-2">{{ $t('goal_weight_screen.goal_weight.title') }}</h3>
                    <p class="text-gray-600">{{ $t('goal_weight_screen.goal_weight.description') }}</p>
                </div>

                <div class="w-full space-y-4">
                    <div class="relative">
                        <input type="number" id="targetWeight"
                            class="w-full p-4 rounded-2xl border-2 border-gray-200 text-center text-xl font-semibold focus:border-gray-600 focus:outline-none"
                            placeholder="60" min="30" max="300" step="0.1">
                        <span id="targetWeightUnit"
                            class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">kg</span>
                        <div id="targetWeightError" class="error-message hidden">{{ $t('goal_weight_screen.goal_weight.not_valid') }}</div>
                    </div>

                    <div id="weightDifference" class="text-sm text-gray-600 hidden">
                        <span id="weightChangeText"></span>
                    </div>

                    <button class="cta-button w-full py-4 text-white font-semibold rounded-2xl text-lg"
                        onclick="validateTargetWeight()">
                        {{ $t('goal_weight_screen.next_btn') }}
                    </button>
                </div>
            </div>
        </div>

        <!-- Question 12 - Activity Level -->
        <div id="question12" class="w-full max-w-lg mx-auto px-4 hidden">
            <div class="card rounded-3xl p-8 shadow-2xl">
                <div class="mb-8 text-center">
                    <h2 class="text-2xl font-bold text-gray-800 mb-3">{{ $t('activity_screen.title') }} </h2>
                    <p class="text-gray-600">{{ $t('activity_screen.description') }}</p>
                </div>

                <div class="w-full space-y-3">
                    <button
                        class="option-button w-full p-4 rounded-2xl text-gray-800 font-medium text-left flex items-center"
                        onclick="nextQuestion()">
                        <span class="text-2xl mr-4">🛋️</span>
                        <span>{{ $t('activity_screen.activity.activity_1') }}</span>
                    </button>
                    <button
                        class="option-button w-full p-4 rounded-2xl text-gray-800 font-medium text-left flex items-center"
                        onclick="nextQuestion()">
                        <span class="text-2xl mr-4">🚶‍♀️</span>
                        <span>{{ $t('activity_screen.activity.activity_2') }}</span>
                    </button>
                    <button
                        class="option-button w-full p-4 rounded-2xl text-gray-800 font-medium text-left flex items-center"
                        onclick="nextQuestion()">
                        <span class="text-2xl mr-4">🏃‍♂️</span>
                        <span>{{ $t('activity_screen.activity.activity_3') }}</span>
                    </button>
                    <button
                        class="option-button w-full p-4 rounded-2xl text-gray-800 font-medium text-left flex items-center"
                        onclick="nextQuestion()">
                        <span class="text-2xl mr-4">💪</span>
                        <span>{{ $t('activity_screen.activity.activity_4') }}</span>
                    </button>
                </div>
            </div>
        </div>

        <!-- Question 13 - Thank You Page -->
        <div id="question13" class="w-full max-w-lg mx-auto text-center hidden">
            <div class="card rounded-3xl p-8 shadow-2xl">
                <div class="mb-8">
                    <div
                        class="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-3xl mx-auto mb-6 flex items-center justify-center">
                        <span class="text-3xl">🙏</span>
                    </div>
                    <h2 class="text-2xl font-bold text-gray-800 mb-6">{{ $t('thankyou_screen.title') }}</h2>

                    <div class="text-left space-y-4 mb-8">
                        <p v-html="$t('thankyou_screen.description_1')" class="text-gray-700 leading-relaxed"></p>
                        <p v-html="$t('thankyou_screen.description_2')" class="text-gray-700 leading-relaxed font-semibold">
                        </p>

                        <!-- Progress Indicator -->
                        <!-- <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 mt-6">
                            <div class="flex items-center justify-center space-x-2">
                                <div class="w-3 h-3 bg-blue-500 rounded-full"></div>
                                <div class="w-3 h-3 bg-blue-500 rounded-full"></div>
                                <div class="w-3 h-3 bg-blue-300 rounded-full"></div>
                                <div class="w-3 h-3 bg-gray-300 rounded-full"></div>
                            </div>
                            <div class="text-center text-sm text-gray-600 mt-2">{{ $t('thankyou_screen.prosessing') }}</div>
                        </div> -->
                    </div>
                </div>

                <button class="cta-button w-full py-4 text-white font-semibold rounded-2xl text-lg"
                    onclick="nextQuestion()">
                    {{ $t('thankyou_screen.next_btn') }}
                </button>
            </div>
        </div>

        <!-- Question 14 - Diet Type -->
        <div id="question14" class="w-full max-w-lg mx-auto px-4 hidden">
            <div class="card rounded-3xl p-8 shadow-2xl">
                <div class="mb-8 text-center">
                    <h2 class="text-2xl font-bold text-gray-800 mb-3">{{ $t('diet_type_screen.title') }}</h2>
                    <p class="text-gray-600">{{ $t('diet_type_screen.description') }}</p>
                </div>

                <div class="w-full space-y-3">
                    <button
                        class="option-button w-full p-4 rounded-2xl text-gray-800 font-medium text-left flex items-center"
                        onclick="nextQuestion()">
                        <span class="text-2xl mr-4">🍽️</span>
                        <span>{{ $t('diet_type_screen.diet_type.diet_type_1') }}</span>
                    </button>
                    <button
                        class="option-button w-full p-4 rounded-2xl text-gray-800 font-medium text-left flex items-center"
                        onclick="nextQuestion()">
                        <span class="text-2xl mr-4">🥗</span>
                        <span>{{ $t('diet_type_screen.diet_type.diet_type_2') }}</span>
                    </button>
                    <button
                        class="option-button w-full p-4 rounded-2xl text-gray-800 font-medium text-left flex items-center"
                        onclick="nextQuestion()">
                        <span class="text-2xl mr-4">🥩</span>
                        <span>{{ $t('diet_type_screen.diet_type.diet_type_3') }}</span>
                    </button>
                    <button
                        class="option-button w-full p-4 rounded-2xl text-gray-800 font-medium text-left flex items-center"
                        onclick="nextQuestion()">
                        <span class="text-2xl mr-4">🌾</span>
                        <span>{{ $t('diet_type_screen.diet_type.diet_type_4') }}</span>
                    </button>
                </div>
            </div>
        </div>

        <!-- Question 15 - Challenges -->
        <div id="question15" class="w-full max-w-lg mx-auto px-4 hidden">
            <div class="card rounded-3xl p-8 shadow-2xl">
                <div class="mb-8 text-center">
                    <h2 class="text-2xl font-bold text-gray-800 mb-3">{{ $t('challenge_screen.title') }}</h2>
                    <p class="text-gray-600">{{ $t('challenge_screen.description') }}</p>
                </div>

                <div class="w-full space-y-3">
                    <button
                        class="option-button w-full p-4 rounded-2xl text-gray-800 font-medium text-left flex items-center"
                        onclick="nextQuestion()">
                        <span class="text-2xl mr-4">⏰</span>
                        <span>{{ $t('challenge_screen.challenge.challenge_1') }}</span>
                    </button>
                    <button
                        class="option-button w-full p-4 rounded-2xl text-gray-800 font-medium text-left flex items-center"
                        onclick="nextQuestion()">
                        <span class="text-2xl mr-4">🍰</span>
                        <span>{{ $t('challenge_screen.challenge.challenge_2') }}</span>
                    </button>
                    <button
                        class="option-button w-full p-4 rounded-2xl text-gray-800 font-medium text-left flex items-center"
                        onclick="nextQuestion()">
                        <span class="text-2xl mr-4">📊</span>
                        <span>{{ $t('challenge_screen.challenge.challenge_3') }}</span>
                    </button>
                    <button
                        class="option-button w-full p-4 rounded-2xl text-gray-800 font-medium text-left flex items-center"
                        onclick="nextQuestion()">
                        <span class="text-2xl mr-4">💪</span>
                        <span>{{ $t('challenge_screen.challenge.challenge_4') }}</span>
                    </button>
                </div>
            </div>
        </div>

        <!-- Question 16 - Water Intake -->
        <div id="question16" class="w-full max-w-lg mx-auto px-4 hidden">
            <div class="card rounded-3xl p-8 shadow-2xl">
                <div class="mb-8 text-center">
                    <h2 class="text-2xl font-bold text-gray-800 mb-3">{{ $t('water_intake_screen.title') }}</h2>
                    <p class="text-gray-600">{{ $t('water_intake_screen.description') }}</p>
                </div>

                <div class="w-full space-y-3">
                    <button
                        class="option-button w-full p-4 rounded-2xl text-gray-800 font-medium text-left flex items-center"
                        onclick="nextQuestion()">
                        <span class="text-2xl mr-4">💧</span>
                        <span>{{ $t('water_intake_screen.water_intake.water_intake_1') }}</span>
                    </button>
                    <button
                        class="option-button w-full p-4 rounded-2xl text-gray-800 font-medium text-left flex items-center"
                        onclick="nextQuestion()">
                        <span class="text-2xl mr-4">🥤</span>
                        <span>{{ $t('water_intake_screen.water_intake.water_intake_2') }}</span>
                    </button>
                    <button
                        class="option-button w-full p-4 rounded-2xl text-gray-800 font-medium text-left flex items-center"
                        onclick="nextQuestion()">
                        <span class="text-2xl mr-4">💦</span>
                        <span>{{ $t('water_intake_screen.water_intake.water_intake_3') }}</span>
                    </button>
                    <button
                        class="option-button w-full p-4 rounded-2xl text-gray-800 font-medium text-left flex items-center"
                        onclick="nextQuestion()">
                        <span class="text-2xl mr-4">🌊</span>
                        <span>{{ $t('water_intake_screen.water_intake.water_intake_4') }}</span>
                    </button>
                </div>
            </div>
        </div>

        <!-- Question 17 - Sleep -->
        <div id="question17" class="w-full max-w-lg mx-auto px-4 hidden">
            <div class="card rounded-3xl p-8 shadow-2xl">
                <div class="mb-8 text-center">
                    <h2 class="text-2xl font-bold text-gray-800 mb-3">{{ $t('sleep_screen.title') }}</h2>
                    <p class="text-gray-600">{{ $t('sleep_screen.description') }}</p>
                </div>

                <div class="w-full space-y-3">
                    <button
                        class="option-button w-full p-4 rounded-2xl text-gray-800 font-medium text-left flex items-center"
                        onclick="nextQuestion()">
                        <span class="text-2xl mr-4">😴</span>
                        <span>{{ $t('sleep_screen.sleep.sleep_1') }}</span>
                    </button>
                    <button
                        class="option-button w-full p-4 rounded-2xl text-gray-800 font-medium text-left flex items-center"
                        onclick="nextQuestion()">
                        <span class="text-2xl mr-4">🛌</span>
                        <span>{{ $t('sleep_screen.sleep.sleep_2') }}</span>
                    </button>
                    <button
                        class="option-button w-full p-4 rounded-2xl text-gray-800 font-medium text-left flex items-center"
                        onclick="nextQuestion()">
                        <span class="text-2xl mr-4">😊</span>
                        <span>{{ $t('sleep_screen.sleep.sleep_3') }}</span>
                    </button>
                    <button
                        class="option-button w-full p-4 rounded-2xl text-gray-800 font-medium text-left flex items-center"
                        onclick="nextQuestion()">
                        <span class="text-2xl mr-4">💤</span>
                        <span>{{ $t('sleep_screen.sleep.sleep_4') }}</span>
                    </button>
                </div>
            </div>
        </div>

        <!-- Question 18 - Eating Out -->
        <div id="question18" class="w-full max-w-lg mx-auto px-4 hidden">
            <div class="card rounded-3xl p-8 shadow-2xl">
                <div class="mb-8 text-center">
                    <h2 class="text-2xl font-bold text-gray-800 mb-3">{{ $t('eating_out_screen.title') }}</h2>
                    <p class="text-gray-600">{{ $t('eating_out_screen.description') }}</p>
                </div>

                <div class="w-full space-y-3">
                    <button
                        class="option-button w-full p-4 rounded-2xl text-gray-800 font-medium text-left flex items-center"
                        onclick="nextQuestion()">
                        <span class="text-2xl mr-4">🏠</span>
                        <span>{{ $t('eating_out_screen.eating_out.eating_out_1') }}</span>
                    </button>
                    <button
                        class="option-button w-full p-4 rounded-2xl text-gray-800 font-medium text-left flex items-center"
                        onclick="nextQuestion()">
                        <span class="text-2xl mr-4">🍽️</span>
                        <span>{{ $t('eating_out_screen.eating_out.eating_out_2') }}</span>
                    </button>
                    <button
                        class="option-button w-full p-4 rounded-2xl text-gray-800 font-medium text-left flex items-center"
                        onclick="nextQuestion()">
                        <span class="text-2xl mr-4">🍔</span>
                        <span>{{ $t('eating_out_screen.eating_out.eating_out_3') }}</span>
                    </button>
                    <button
                        class="option-button w-full p-4 rounded-2xl text-gray-800 font-medium text-left flex items-center"
                        onclick="nextQuestion()">
                        <span class="text-2xl mr-4">🍕</span>
                        <span>{{ $t('eating_out_screen.eating_out.eating_out_4') }}</span>
                    </button>
                </div>
            </div>
        </div>

        <!-- Question 19 - Previous App Experience -->
        <div id="question19" class="w-full max-w-lg mx-auto px-4 hidden">
            <div class="card rounded-3xl p-8 shadow-2xl">
                <div class="mb-8 text-center">
                    <h2 class="text-2xl font-bold text-gray-800 mb-3">{{ $t('previous_app_experience_screen.title') }}</h2>
                    <p class="text-gray-600">{{ $t('previous_app_experience_screen.description') }}</p>
                </div>

                <div class="w-full space-y-3">
                    <button
                        class="option-button w-full p-4 rounded-2xl text-gray-800 font-medium text-left flex items-center"
                        onclick="nextQuestion()">
                        <span class="text-2xl mr-4">🆕</span>
                        <span>{{ $t('previous_app_experience_screen.previous_app_experience.no') }}</span>
                    </button>
                    <button
                        class="option-button w-full p-4 rounded-2xl text-gray-800 font-medium text-left flex items-center"
                        onclick="nextQuestion()">
                        <span class="text-2xl mr-4">📱</span>
                        <span>{{ $t('previous_app_experience_screen.previous_app_experience.yes') }}</span>
                    </button>
                </div>
            </div>
        </div>

        <!-- Question 20 - Heka AI Feature 1 -->
        <div id="question20" class="w-full max-w-lg mx-auto text-center hidden">
            <div class="card rounded-3xl p-8 shadow-2xl">
                <div class="mb-8">
                    <div
                        class="w-20 h-20 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-3xl mx-auto mb-6 flex items-center justify-center">
                        <span class="text-3xl">📸</span>
                    </div>
                    <h2 class="text-2xl font-bold text-gray-800 mb-6">{{ $t('heka_feature_1_screen.title') }}</h2>

                    <div class="text-left space-y-4 mb-8">
                        <p v-html="$t('heka_feature_1_screen.description')" class="text-gray-700 leading-relaxed">
                        </p>

                        <!-- Feature Highlight -->
                        <div class="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-6">
                            <div class="text-center">
                                <div class="text-4xl font-bold text-purple-600 mb-2">{{ $t('heka_feature_1_screen.feature_highlight.title') }}</div>
                                <div class="text-sm text-gray-600">{{ $t('heka_feature_1_screen.feature_highlight.description') }}</div>
                            </div>
                        </div>

                        <div class="flex items-center justify-center space-x-4 mt-6">
                            <div class="text-center">
                                <div class="text-2xl mb-1">📱</div>
                                <div class="text-xs text-gray-600">{{ $t('heka_feature_1_screen.feature_highlight.feature_1') }}</div>
                            </div>
                            <div class="text-2xl text-gray-400">→</div>
                            <div class="text-center">
                                <div class="text-2xl mb-1">🤖</div>
                                <div class="text-xs text-gray-600">{{ $t('heka_feature_1_screen.feature_highlight.feature_2') }}</div>
                            </div>
                            <div class="text-2xl text-gray-400">→</div>
                            <div class="text-center">
                                <div class="text-2xl mb-1">📊</div>
                                <div class="text-xs text-gray-600">{{ $t('heka_feature_1_screen.feature_highlight.feature_3') }}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <button class="cta-button w-full py-4 text-white font-semibold rounded-2xl text-lg"
                    onclick="nextQuestion()">
                    {{ $t('heka_feature_1_screen.next_btn') }}
                </button>
            </div>
        </div>

        <!-- Question 21 - Heka AI Feature 2 -->
        <div id="question21" class="w-full max-w-lg mx-auto text-center hidden">
            <div class="card rounded-3xl p-8 shadow-2xl">
                <div class="mb-8">
                    <div
                        class="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl mx-auto mb-6 flex items-center justify-center">
                        <span class="text-3xl">🧬</span>
                    </div>
                    <h2 class="text-2xl font-bold text-gray-800 mb-6">{{ $t('heka_feature_2_screen.title') }}</h2>

                    <div class="text-left space-y-4 mb-8">
                        <p v-html="$t('heka_feature_2_screen.description')" class="text-gray-700 leading-relaxed">
                        </p>

                        <!-- Macro Display -->
                        <div class="grid grid-cols-3 gap-3">
                            <div class="bg-red-50 rounded-xl p-3 text-center">
                                <div class="text-2xl mb-1">🍖</div>
                                <div class="text-xs font-semibold text-red-600">{{ $t('heka_feature_2_screen.macro_list.macro_1') }}</div>
                            </div>
                            <div class="bg-yellow-50 rounded-xl p-3 text-center">
                                <div class="text-2xl mb-1">🍞</div>
                                <div class="text-xs font-semibold text-yellow-600">{{ $t('heka_feature_2_screen.macro_list.macro_2') }}</div>
                            </div>
                            <div class="bg-blue-50 rounded-xl p-3 text-center">
                                <div class="text-2xl mb-1">🥑</div>
                                <div class="text-xs font-semibold text-blue-600">{{ $t('heka_feature_2_screen.macro_list.macro_3') }}</div>
                            </div>
                        </div>

                        <!-- Nutrition List -->
                        <div class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4">
                            <div class="text-sm font-semibold text-green-700 mb-2">{{ $t('heka_feature_2_screen.nutrition_list.title') }}</div>
                            <div class="grid grid-cols-2 gap-2 text-xs text-gray-600">
                                <div>• {{ $t('heka_feature_2_screen.nutrition_list.nutrition_1') }}</div>
                                <div>• {{ $t('heka_feature_2_screen.nutrition_list.nutrition_2') }}</div>
                                <div>• {{ $t('heka_feature_2_screen.nutrition_list.nutrition_3') }}</div>
                                <div>• {{ $t('heka_feature_2_screen.nutrition_list.nutrition_4') }}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <button class="cta-button w-full py-4 text-white font-semibold rounded-2xl text-lg"
                    onclick="nextQuestion()">
                    {{ $t('heka_feature_2_screen.next_btn') }}
                </button>
            </div>
        </div>

        <!-- Question 22 - Heka AI Feature 3 -->
        <div id="question22" class="w-full max-w-lg mx-auto text-center hidden">
            <div class="card rounded-3xl p-8 shadow-2xl">
                <div class="mb-8">
                    <div
                        class="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-3xl mx-auto mb-6 flex items-center justify-center">
                        <span class="text-3xl">⌚</span>
                    </div>
                    <h2 class="text-2xl font-bold text-gray-800 mb-6">{{ $t('heka_feature_3_screen.title') }}</h2>

                    <div class="text-left space-y-4 mb-8">
                        <p v-html="$t('heka_feature_3_screen.description')" class="text-gray-700 leading-relaxed">
                        </p>

                        <!-- Connected Apps -->
                        <div class="grid grid-cols-2 gap-3">
                            <div class="bg-gray-50 rounded-xl p-4 text-center">
                                <div class="text-2xl mb-2">⌚</div>
                                <div class="text-xs font-semibold text-gray-700">{{ $t('heka_feature_3_screen.connected_device_list.connected_device_1') }}</div>
                                <div class="text-xs text-gray-500">{{ $t('heka_feature_3_screen.connected_device_list.connected_device_2') }}</div>
                            </div>
                            <div class="bg-gray-50 rounded-xl p-4 text-center">
                                <div class="text-2xl mb-2">📱</div>
                                <div class="text-xs font-semibold text-gray-700">{{ $t('heka_feature_3_screen.connected_app_list.connected_app_1') }}</div>
                                <div class="text-xs text-gray-500">{{ $t('heka_feature_3_screen.connected_app_list.connected_app_2') }}</div>
                            </div>
                        </div>

                        <!-- Benefits -->
                        <div class="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-4">
                            <div class="space-y-2">
                                <div class="flex items-center text-sm">
                                    <span class="text-green-500 mr-2">✓</span>
                                    <span class="text-gray-700">{{ $t('heka_feature_3_screen.feature_list.feature_1') }}</span>
                                </div>
                                <div class="flex items-center text-sm">
                                    <span class="text-green-500 mr-2">✓</span>
                                    <span class="text-gray-700">{{ $t('heka_feature_3_screen.feature_list.feature_2') }}</span>
                                </div>
                                <div class="flex items-center text-sm">
                                    <span class="text-green-500 mr-2">✓</span>
                                    <span class="text-gray-700">{{ $t('heka_feature_3_screen.feature_list.feature_3') }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <button class="cta-button w-full py-4 text-white font-semibold rounded-2xl text-lg"
                    onclick="nextQuestion()">
                    {{ $t('heka_feature_3_screen.next_btn') }}
                </button>
            </div>
        </div>

        <!-- Question 23 - Medical Conditions -->
        <div id="question23" class="w-full max-w-lg mx-auto px-4 hidden">
            <div class="card rounded-3xl p-8 shadow-2xl">
                <div class="mb-8 text-center">
                    <h2 class="text-2xl font-bold text-gray-800 mb-3">{{ $t('medical_condition_screen.title') }}</h2>
                    <p class="text-gray-600">{{ $t('medical_condition_screen.description') }}</p>
                </div>

                <div class="w-full space-y-3">
                    <button
                        class="option-button w-full p-4 rounded-2xl text-gray-800 font-medium text-left flex items-center"
                        onclick="nextQuestion()">
                        <span class="text-2xl mr-4">✅</span>
                        <span>{{ $t('medical_condition_screen.medical_condition.medical_condition_1') }}</span>
                    </button>
                    <button
                        class="option-button w-full p-4 rounded-2xl text-gray-800 font-medium text-left flex items-center"
                        onclick="nextQuestion()">
                        <span class="text-2xl mr-4">🩺</span>
                        <span>{{ $t('medical_condition_screen.medical_condition.medical_condition_2') }}</span>
                    </button>
                    <button
                        class="option-button w-full p-4 rounded-2xl text-gray-800 font-medium text-left flex items-center"
                        onclick="nextQuestion()">
                        <span class="text-2xl mr-4">❤️</span>
                        <span>{{ $t('medical_condition_screen.medical_condition.medical_condition_3') }}</span>
                    </button>
                    <button
                        class="option-button w-full p-4 rounded-2xl text-gray-800 font-medium text-left flex items-center"
                        onclick="nextQuestion()">
                        <span class="text-2xl mr-4">🏥</span>
                        <span>{{ $t('medical_condition_screen.medical_condition.medical_condition_4') }}</span>
                    </button>
                </div>
            </div>
        </div>

        <!-- Question 24 - Loading Analysis -->
        <div id="question24" class="w-full max-w-lg mx-auto text-center hidden">
            <div class="card rounded-3xl p-8 shadow-2xl">
                <div class="mb-8">
                    <h2 class="text-2xl font-bold text-gray-800 mb-8">{{ $t('loading_analysis_screen.title') }}</h2>

                    <!-- Progress Circle -->
                    <div class="progress-circle mb-8" id="progressCircle">
                        <div class="progress-text" id="progressText">0%</div>
                    </div>

                    <!-- Loading Steps -->
                    <div class="space-y-4" id="loadingSteps">
                        <div class="flex items-center text-left p-3 rounded-xl bg-gray-50" id="step1">
                            <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                                <div class="loading-circle w-4 h-4 border-2 border-white border-t-transparent"></div>
                            </div>
                            <span class="text-gray-700">{{ $t('loading_analysis_screen.analtstic_text.analtstic_text_1') }}</span>
                        </div>
                        <div class="flex items-center text-left p-3 rounded-xl bg-gray-100" id="step2">
                            <div class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                                <span class="text-white text-sm">2</span>
                            </div>
                            <span class="text-gray-500">{{ $t('loading_analysis_screen.analtstic_text.analtstic_text_2') }}</span>
                        </div>
                        <div class="flex items-center text-left p-3 rounded-xl bg-gray-100" id="step3">
                            <div class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                                <span class="text-white text-sm">3</span>
                            </div>
                            <span class="text-gray-500">{{ $t('loading_analysis_screen.analtstic_text.analtstic_text_3') }}</span>
                        </div>
                        <div class="flex items-center text-left p-3 rounded-xl bg-gray-100" id="step4">
                            <div class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                                <span class="text-white text-sm">4</span>
                            </div>
                            <span class="text-gray-500">{{ $t('loading_analysis_screen.analtstic_text.analtstic_text_4') }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Question 25 - Timeline -->
        <div id="question25" class="w-full max-w-lg mx-auto px-4 hidden">
            <div class="card rounded-3xl p-8 shadow-2xl">
                <div class="mb-8 text-center">
                    <h2 class="text-2xl font-bold text-gray-800 mb-3">{{ $t('timeline_screen.title') }}</h2>
                    <p class="text-gray-600">{{ $t('timeline_screen.description') }}</p>
                </div>

                <div class="w-full space-y-3">
                    <button
                        class="option-button w-full p-4 rounded-2xl text-gray-800 font-medium text-left flex items-center"
                        onclick="selectTimeline('1-2 tháng (Nhanh)')">
                        <span class="text-2xl mr-4">🚀</span>
                        <span>{{ $t('timeline_screen.timeline.timeline_1') }}</span>
                    </button>
                    <button
                        class="option-button w-full p-4 rounded-2xl text-gray-800 font-medium text-left flex items-center"
                        onclick="selectTimeline('3-6 tháng (Cân bằng)')">
                        <span class="text-2xl mr-4">⚖️</span>
                        <span>{{ $t('timeline_screen.timeline.timeline_2') }}</span>
                    </button>
                    <button
                        class="option-button w-full p-4 rounded-2xl text-gray-800 font-medium text-left flex items-center"
                        onclick="selectTimeline('6-12 tháng (Bền vững)')">
                        <span class="text-2xl mr-4">🌱</span>
                        <span>{{ $t('timeline_screen.timeline.timeline_3') }}</span>
                    </button>
                    <button
                        class="option-button w-full p-4 rounded-2xl text-gray-800 font-medium text-left flex items-center"
                        onclick="selectTimeline('Trên 1 năm (Lối sống)')">
                        <span class="text-2xl mr-4">🏃‍♀️</span>
                        <span>{{ $t('timeline_screen.timeline.timeline_4') }}</span>
                    </button>
                </div>
            </div>
        </div>

        <!-- Question 26 - Commitment -->
        <div id="question26" class="w-full max-w-lg mx-auto px-4 hidden">
            <div class="card rounded-3xl p-8 shadow-2xl">
                <div class="mb-8 text-center">
                    <h2 class="text-2xl font-bold text-gray-800 mb-3">{{ $t('commitment_screen.title') }}</h2>
                    <p class="text-gray-600">{{ $t('commitment_screen.description') }}</p>
                </div>

                <div class="w-full space-y-3">
                    <button
                        class="option-button w-full p-4 rounded-2xl text-gray-800 font-medium text-left flex items-center"
                        onclick="nextQuestion()">
                        <span class="text-2xl mr-4">💪</span>
                        <span>{{ $t('commitment_screen.commitment.commitment_1') }}</span>
                    </button>
                    <button
                        class="option-button w-full p-4 rounded-2xl text-gray-800 font-medium text-left flex items-center"
                        onclick="nextQuestion()">
                        <span class="text-2xl mr-4">👍</span>
                        <span>{{ $t('commitment_screen.commitment.commitment_2') }}</span>
                    </button>
                    <button
                        class="option-button w-full p-4 rounded-2xl text-gray-800 font-medium text-left flex items-center"
                        onclick="nextQuestion()">
                        <span class="text-2xl mr-4">🤔</span>
                        <span>{{ $t('commitment_screen.commitment.commitment_3') }}</span>
                    </button>
                    <button
                        class="option-button w-full p-4 rounded-2xl text-gray-800 font-medium text-left flex items-center"
                        onclick="nextQuestion()">
                        <span class="text-2xl mr-4">😅</span>
                        <span>{{ $t('commitment_screen.commitment.commitment_4') }}</span>
                    </button>
                </div>
            </div>
        </div>

        <!-- Question 27 - Email Input -->
        <div id="question27" class="w-full max-w-lg mx-auto px-4 hidden">
            <div class="card rounded-3xl p-8 shadow-2xl">
                <div class="mb-8 text-center">
                    <h2 class="text-2xl font-bold text-gray-800 mb-3">{{ $t('email_input_screen.title') }}</h2>
                    <p class="text-gray-600 mb-4">{{ $t('email_input_screen.description') }}</p>
                </div>

                <div class="w-full space-y-4">
                    <div class="relative">
                        <input type="email" id="userEmail"
                            class="w-full p-4 rounded-2xl border-2 border-gray-200 text-center text-lg focus:border-gray-600 focus:outline-none"
                            placeholder="your.email@example.com">
                        <div id="emailError" class="error-message hidden">{{ $t('email_input_screen.email_invalid') }}</div>
                    </div>

                    <!-- Privacy Notice -->
                    <div class="bg-blue-50 rounded-2xl p-4 text-left">
                        <div class="text-sm text-gray-700 space-y-2">
                            <p v-html="$t('email_input_screen.notice_text')"></p>
                        </div>
                    </div>

                    <button class="cta-button w-full py-4 text-white font-semibold rounded-2xl text-lg"
                        onclick="validateEmail()">
                        {{ $t('email_input_screen.next_btn') }}
                    </button>
                </div>
            </div>
        </div>

        <!-- Question 28 - Loading Summary -->
        <div id="question28" class="w-full max-w-lg mx-auto text-center hidden">
            <div class="card rounded-3xl p-8 shadow-2xl">
                <div class="mb-8">
                    <div
                        class="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-3xl mx-auto mb-6 flex items-center justify-center">
                        <span class="text-3xl">📊</span>
                    </div>
                    <h2 class="text-2xl font-bold text-gray-800 mb-6">{{ $t('loading_summary_screen.title') }}</h2>

                    <!-- User Summary -->
                    <div class="space-y-4 mb-8 text-left">
                        <div class="bg-blue-50 rounded-2xl p-4">
                            <div class="flex items-center mb-2">
                                <span class="text-2xl mr-3">🎯</span>
                                <span class="font-semibold text-gray-800">{{ $t('loading_summary_screen.summary.summary_1.title') }}</span>
                            </div>
                            <div id="userGoalSummary" class="text-gray-700 ml-11">{{ $t('loading_summary_screen.summary.summary_1.description') }}</div>
                        </div>

                        <div class="bg-green-50 rounded-2xl p-4">
                            <div class="flex items-center mb-2">
                                <span class="text-2xl mr-3">⚖️</span>
                                <span class="font-semibold text-gray-800">{{ $t('loading_summary_screen.summary.summary_2.title') }}</span>
                            </div>
                            <div id="targetWeightSummary" class="text-gray-700 ml-11">{{ $t('loading_summary_screen.summary.summary_2.description') }}</div>
                        </div>

                        <div class="bg-purple-50 rounded-2xl p-4">
                            <div class="flex items-center mb-2">
                                <span class="text-2xl mr-3">⏰</span>
                                <span class="font-semibold text-gray-800">{{ $t('loading_summary_screen.summary.summary_3.title') }}</span>
                            </div>
                            <div id="timelineSummary" class="text-gray-700 ml-11">{{ $t('loading_summary_screen.summary.summary_3.description') }}</div>
                        </div>
                    </div>

                    <!-- Recommendation -->
                    <div class="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 mb-6">
                        <h3 class="font-bold text-gray-800 mb-3">💡 {{ $t('loading_summary_screen.remommendation.title') }}</h3>
                        <p class="text-gray-700 text-sm leading-relaxed mb-4">
                            <span v-html="$t('loading_summary_screen.remommendation.description')"></span>
                        </p>
                        <div class="flex items-center justify-center space-x-4 text-sm">
                            <div class="text-center">
                                <div class="text-2xl font-bold text-orange-600">{{ $t('loading_summary_screen.remommendation.statistical.left.title') }}</div>
                                <div class="text-gray-600">{{ $t('loading_summary_screen.remommendation.statistical.left.description') }}</div>
                            </div>
                            <div class="text-center">
                                <div class="text-2xl font-bold text-orange-600">{{ $t('loading_summary_screen.remommendation.statistical.right.title') }}</div>
                                <div class="text-gray-600">{{ $t('loading_summary_screen.remommendation.statistical.right.description') }}</div>
                            </div>
                        </div>
                    </div>

                    <div class="loading-circle mb-4" id="loadingCirclePaywall"></div>
                    <p class="text-gray-600" id="loadingTextPaywall">{{ $t('loading_summary_screen.remommendation.preparing') }}</p>
                </div>
            </div>
        </div>

        <!-- Question 29 - Paywall -->
        <div id="question29" class="w-full max-w-2xl mx-auto px-4 hidden">
            <div class="space-y-6">
                <!-- Header -->
                <div class="text-center mb-8">
                    <h2 class="text-3xl font-bold text-white mb-4">{{ $t('paywall_screen.title') }}</h2>
                    <p class="text-white text-opacity-80">{{ $t('paywall_screen.description') }}</p>
                </div>

                <!-- Premium Monthly Plan -->
                <div class="card rounded-3xl p-6 shadow-2xl border-2 border-gray-200">
                    <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center">
                            <div
                                class="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mr-4">
                                <span class="text-xl">📅</span>
                            </div>
                            <div>
                                <h3 class="text-xl font-bold text-gray-800">{{ $t('paywall_screen.plan.monthly.title') }}</h3>
                                <p class="text-gray-600 text-sm">{{ $t('paywall_screen.plan.monthly.description') }}</p>
                            </div>
                        </div>
                        <div class="text-right">
                            <div class="text-2xl font-bold text-gray-800">{{ $t('paywall_screen.plan.monthly.price') }}</div>
                            <div class="text-sm text-gray-600">{{ $t('paywall_screen.plan.monthly.duration') }}</div>
                        </div>
                    </div>

                    <button class="option-button w-full py-3 text-gray-800 font-semibold rounded-2xl mb-4"
                        onclick="selectPlan('monthly')">
                        {{ $t('paywall_screen.plan.monthly.select_btn') }}
                    </button>
                </div>

                <!-- Premium Yearly Plan - Best Seller -->
                <div
                    class="premium-card rounded-3xl p-6 text-white shadow-2xl border-2 border-yellow-400 relative animate-pulse-glow">
                    <!-- Best Seller Badge - More Prominent and Visible -->
                    <div
                        class="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-yellow-900 px-4 py-2 rounded-full text-sm font-bold shadow-lg transform rotate-12 animate-bounce-subtle z-10">
                        ⭐ {{ $t('paywall_screen.plan.yearly.best_seller_badge') }} ⭐
                    </div>

                    <!-- Savings Badge - Top Left -->
                    <div
                        class="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse z-10">
                        {{ $t('paywall_screen.plan.yearly.savings_badge') }}
                    </div>

                    <div class="flex items-center justify-between mb-4 mt-6">
                        <div class="flex items-center">
                            <div
                                class="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center mr-4 animate-spin-slow">
                                <span class="text-xl">👑</span>
                            </div>
                            <div>
                                <h3 class="text-xl font-bold">{{ $t('paywall_screen.plan.yearly.title') }}</h3>
                                <p class="text-yellow-300 text-sm font-semibold">{{ $t('paywall_screen.plan.yearly.description') }}</p>
                            </div>
                        </div>
                        <div class="text-right">
                            <div class="text-lg text-yellow-300 line-through">{{ $t('paywall_screen.plan.yearly.price_through') }}</div>
                            <div class="text-3xl font-bold text-yellow-400">{{ $t('paywall_screen.plan.yearly.price') }}</div>
                            <div
                                class="text-xl text-yellow-200 font-bold bg-yellow-500 bg-opacity-20 px-2 py-1 rounded-lg">
                                {{ $t('paywall_screen.plan.yearly.price_per_month') }}</div>
                        </div>
                    </div>

                    <!-- Enhanced Savings Display -->
                    <div
                        class="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-4 mb-4 border-2 border-green-400">
                        <div class="text-center">
                            <div class="text-xl font-bold text-white">💰 {{ $t('paywall_screen.plan.yearly.enhance_saving.title') }}</div>
                            <div class="text-sm text-green-100 font-medium">{{ $t('paywall_screen.plan.yearly.enhance_saving.description') }}</div>
                        </div>
                    </div>

                    <!-- Animated CTA Button -->
                    <button
                        class="yearly-cta-button w-full py-4 text-gray-900 font-bold rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 mb-4 shadow-lg transform transition-all duration-300 hover:scale-105 animate-pulse-button"
                        onclick="selectPlan('yearly')">
                        <span class="flex items-center justify-center">
                            <span class="mr-2">🚀</span>
                            {{ $t('paywall_screen.plan.yearly.CTA_btn.title') }}
                            <span class="ml-2">🚀</span>
                        </span>
                    </button>

                    <!-- Click Indicator -->
                    <div class="text-center">
                        <div class="inline-flex items-center text-yellow-300 text-sm animate-bounce">
                            <span class="mr-1">👆</span>
                            <span>{{ $t('paywall_screen.plan.yearly.CTA_btn.click_btn') }}</span>
                        </div>
                    </div>
                </div>

                <!-- Premium Benefits -->
                <div class="card rounded-3xl p-6 shadow-2xl">
                    <h3 class="text-xl font-bold text-gray-800 mb-4 text-center">{{ $t('paywall_screen.preview_benefit.title') }}</h3>
                    <div class="grid grid-cols-1 gap-3 text-left">
                        <div class="flex items-center">
                            <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3">
                                <span class="text-white text-xs">✓</span>
                            </div>
                            <span class="text-sm text-gray-700">{{ $t('paywall_screen.preview_benefit.benefit_list.benefit_1') }}</span>
                        </div>
                        <div class="flex items-center">
                            <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3">
                                <span class="text-white text-xs">✓</span>
                            </div>
                            <span class="text-sm text-gray-700">{{ $t('paywall_screen.preview_benefit.benefit_list.benefit_2') }}</span>
                        </div>
                        <div class="flex items-center">
                            <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3">
                                <span class="text-white text-xs">✓</span>
                            </div>
                            <span class="text-sm text-gray-700">{{ $t('paywall_screen.preview_benefit.benefit_list.benefit_3') }}</span>
                        </div>
                        <div class="flex items-center">
                            <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3">
                                <span class="text-white text-xs">✓</span>
                            </div>
                            <span class="text-sm text-gray-700">{{ $t('paywall_screen.preview_benefit.benefit_list.benefit_4') }}</span>
                        </div>
                        <div class="flex items-center">
                            <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3">
                                <span class="text-white text-xs">✓</span>
                            </div>
                            <span class="text-sm text-gray-700">{{ $t('paywall_screen.preview_benefit.benefit_list.benefit_5') }}</span>
                        </div>
                        <div class="flex items-center">
                            <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3">
                                <span class="text-white text-xs">✓</span>
                            </div>
                            <span class="text-sm text-gray-700">{{ $t('paywall_screen.preview_benefit.benefit_list.benefit_6') }}</span>
                        </div>
                    </div>
                </div>

                <!-- User Reviews Slider -->
                <div class="card rounded-3xl p-6 shadow-2xl">
                    <h3 class="text-xl font-bold text-gray-800 mb-4 text-center">{{ $t('paywall_screen.user_review.title') }}</h3>
                    <div class="relative overflow-hidden">
                        <div id="reviewSlider" class="flex transition-transform duration-500 ease-in-out">
                            <!-- Review 1 -->
                            <div class="w-full flex-shrink-0 px-2">
                                <div class="bg-gray-50 rounded-xl p-4">
                                    <div class="flex items-center mb-3">
                                        <div
                                            class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                                            <span class="text-white font-bold">S</span>
                                        </div>
                                        <div>
                                            <div class="font-semibold text-gray-800">{{ $t('paywall_screen.user_review.review_list.review_1.name') }}</div>
                                            <div class="flex text-yellow-400 text-sm">⭐⭐⭐⭐⭐</div>
                                        </div>
                                    </div>
                                    <p class="text-gray-700 text-sm">"{{ $t('paywall_screen.user_review.review_list.review_1.review') }}"</p>
                                </div>
                            </div>

                            <!-- Review 2 -->
                            <div class="w-full flex-shrink-0 px-2">
                                <div class="bg-gray-50 rounded-xl p-4">
                                    <div class="flex items-center mb-3">
                                        <div
                                            class="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-3">
                                            <span class="text-white font-bold">M</span>
                                        </div>
                                        <div>
                                            <div class="font-semibold text-gray-800">{{ $t('paywall_screen.user_review.review_list.review_2.name') }}</div>
                                            <div class="flex text-yellow-400 text-sm">⭐⭐⭐⭐⭐</div>
                                        </div>
                                    </div>
                                    <p class="text-gray-700 text-sm">"{{ $t('paywall_screen.user_review.review_list.review_2.review') }}"</p>
                                </div>
                            </div>

                            <!-- Review 3 -->
                            <div class="w-full flex-shrink-0 px-2">
                                <div class="bg-gray-50 rounded-xl p-4">
                                    <div class="flex items-center mb-3">
                                        <div
                                            class="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center mr-3">
                                            <span class="text-white font-bold">E</span>
                                        </div>
                                        <div>
                                            <div class="font-semibold text-gray-800">{{ $t('paywall_screen.user_review.review_list.review_3.name') }}</div>
                                            <div class="flex text-yellow-400 text-sm">⭐⭐⭐⭐⭐</div>
                                        </div>
                                    </div>
                                    <p class="text-gray-700 text-sm">"{{ $t('paywall_screen.user_review.review_list.review_3.review') }}"</p>
                                </div>
                            </div>

                            <!-- Review 4 -->
                            <div class="w-full flex-shrink-0 px-2">
                                <div class="bg-gray-50 rounded-xl p-4">
                                    <div class="flex items-center mb-3">
                                        <div
                                            class="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center mr-3">
                                            <span class="text-white font-bold">J</span>
                                        </div>
                                        <div>
                                            <div class="font-semibold text-gray-800">{{ $t('paywall_screen.user_review.review_list.review_4.name') }}</div>
                                            <div class="flex text-yellow-400 text-sm">⭐⭐⭐⭐⭐</div>
                                        </div>
                                    </div>
                                    <p class="text-gray-700 text-sm">"{{ $t('paywall_screen.user_review.review_list.review_4.review') }}"</p>
                                </div>
                            </div>

                            <!-- Review 5 -->
                            <div class="w-full flex-shrink-0 px-2">
                                <div class="bg-gray-50 rounded-xl p-4">
                                    <div class="flex items-center mb-3">
                                        <div
                                            class="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center mr-3">
                                            <span class="text-white font-bold">A</span>
                                        </div>
                                        <div>
                                            <div class="font-semibold text-gray-800">{{ $t('paywall_screen.user_review.review_list.review_5.name') }}</div>
                                            <div class="flex text-yellow-400 text-sm">⭐⭐⭐⭐⭐</div>
                                        </div>
                                    </div>
                                    <p class="text-gray-700 text-sm">"{{ $t('paywall_screen.user_review.review_list.review_5.review') }}"</p>
                                </div>
                            </div>
                        </div>

                        <!-- Slider Dots -->
                        <div class="flex justify-center mt-4 space-x-2">
                            <button class="w-2 h-2 bg-blue-500 rounded-full" onclick="goToReview(0)"></button>
                            <button class="w-2 h-2 bg-gray-300 rounded-full" onclick="goToReview(1)"></button>
                            <button class="w-2 h-2 bg-gray-300 rounded-full" onclick="goToReview(2)"></button>
                            <button class="w-2 h-2 bg-gray-300 rounded-full" onclick="goToReview(3)"></button>
                            <button class="w-2 h-2 bg-gray-300 rounded-full" onclick="goToReview(4)"></button>
                        </div>
                    </div>
                </div>

                <!-- Trust Indicators -->
                <div class="text-center mt-8">
                    <div class="flex justify-center items-center space-x-6 text-white text-opacity-80">
                        <div class="flex items-center">
                            <span class="text-lg mr-2">🔒</span>
                            <span class="text-sm">{{ $t('paywall_screen.trust_indicator.list.trust_indicator_1') }}</span>
                        </div>
                        <div class="flex items-center">
                            <span class="text-lg mr-2">↩️</span>
                            <span class="text-sm">{{ $t('paywall_screen.trust_indicator.list.trust_indicator_2') }}</span>
                        </div>
                        <div class="flex items-center">
                            <span class="text-lg mr-2">⭐</span>
                            <span class="text-sm">{{ $t('paywall_screen.trust_indicator.list.trust_indicator_3') }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Question 30 - Payment Status -->
        <div id="question30" class="w-full max-w-lg mx-auto text-center hidden">
            <div class="card rounded-3xl p-8 shadow-2xl">
                <div class="mb-8">
                    <div id="paymentIcon"
                        class="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl mx-auto mb-6 flex items-center justify-center">
                        <span class="text-3xl">🎉</span>
                    </div>
                    <h2 id="paymentTitle" class="text-3xl font-bold text-gray-800 mb-4">{{ $t('success_screen.title') }}</h2>
                    <p id="paymentMessage" class="text-gray-600 text-lg mb-6">{{ $t('success_screen.description') }}</p>

                    <!-- Success Details -->
                    <div id="successDetails" class="bg-green-50 rounded-2xl p-6 text-left">
                        <h3 class="font-bold text-green-800 mb-3">{{ $t('success_screen.success_detail.title') }}</h3>
                        <div class="space-y-2">
                            <div class="flex items-center">
                                <span class="text-green-500 mr-2">✓</span>
                                <span class="text-sm text-gray-700">{{ $t('success_screen.success_detail.detail_1') }}</span>
                            </div>
                            <div class="flex items-center">
                                <span class="text-green-500 mr-2">✓</span>
                                <span class="text-sm text-gray-700">{{ $t('success_screen.success_detail.detail_2') }}</span>
                            </div>
                            <div class="flex items-center">
                                <span class="text-green-500 mr-2">✓</span>
                                <span class="text-sm text-gray-700">{{ $t('success_screen.success_detail.detail_3') }}</span>
                            </div>
                            <div class="flex items-center">
                                <span class="text-green-500 mr-2">✓</span>
                                <span class="text-sm text-gray-700">{{ $t('success_screen.success_detail.detail_4') }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="space-y-4">
                    <button class="cta-button w-full py-4 text-white font-bold rounded-2xl text-lg">
                        {{ $t('success_screen.download_btn') }}
                    </button>
                    <!-- <button class="option-button w-full py-3 text-gray-800 font-medium rounded-2xl" onclick="simulatePaymentFailure()">
                        Mô phỏng thanh toán thất bại
                    </button> -->
                </div>
            </div>
        </div>
    </div>

    <!-- Footer -->
    <div class=" z-40 p-4">
        <div class="text-center">
            <p class="text-white text-sm opacity-70">Copyright © 2025 by Astronex</p>
        </div>
    </div>
</template>

<script setup>
import { Head } from '@inertiajs/vue3';
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
const urlParams = new URLSearchParams(window.location.search)
const lang = urlParams.get('lang') || 'vi'
locale.value = lang


let currentQuestion = 1;
const totalQuestions = 30;
let selectedUnit = 'metric';
let userHeight = 0;
let userWeight = 0;
let targetWeight = 0;
let selectedGoal = '';
let selectedTimeline = '';
let currentReviewIndex = 0;



const toggleLanguageMenu = () => {
    const menu = document.getElementById('languageMenu');
    menu.classList.toggle('hidden');
}

const changeLanguage = (lang, flag, code) => {
    const btn = document.getElementById('languageBtn');
    btn.innerHTML = `
                <span class="text-lg">${flag}</span>
                <span class="text-sm font-medium">${code}</span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            `;
    document.getElementById('languageMenu').classList.add('hidden');
}

const selectGoal = (goal) => {
    selectedGoal = goal;
    nextQuestion();
}

const selectTimeline = (timeline) => {
    selectedTimeline = timeline;
    nextQuestion();
}

const toggleUnit = (unit) => {
    selectedUnit = unit;

    const metricBtn = document.getElementById('metricBtn');
    const imperialBtn = document.getElementById('imperialBtn');
    const metricInputs = document.getElementById('metricInputs');
    const imperialInputs = document.getElementById('imperialInputs');

    if (unit === 'metric') {
        metricBtn.className = 'px-4 py-2 rounded-xl text-sm font-medium transition-all bg-white text-gray-800 shadow-sm';
        imperialBtn.className = 'px-4 py-2 rounded-xl text-sm font-medium transition-all text-gray-600';
        metricInputs.classList.remove('hidden');
        imperialInputs.classList.add('hidden');
        if (document.getElementById('targetWeightUnit')) {
            document.getElementById('targetWeightUnit').textContent = 'kg';
        }
    } else {
        imperialBtn.className = 'px-4 py-2 rounded-xl text-sm font-medium transition-all bg-white text-gray-800 shadow-sm';
        metricBtn.className = 'px-4 py-2 rounded-xl text-sm font-medium transition-all text-gray-600';
        imperialInputs.classList.remove('hidden');
        metricInputs.classList.add('hidden');
        if (document.getElementById('targetWeightUnit')) {
            document.getElementById('targetWeightUnit').textContent = 'lbs';
        }
    }
}

const validateHeightWeight = () => {
    let height = 0;
    let weight = 0;
    let hasError = false;

    // Clear previous errors
    const heightError = document.getElementById('heightError');
    const weightError = document.getElementById('weightError');
    const heightImperialError = document.getElementById('heightImperialError');
    const weightImperialError = document.getElementById('weightImperialError');

    if (heightError) heightError.classList.add('hidden');
    if (weightError) weightError.classList.add('hidden');
    if (heightImperialError) heightImperialError.classList.add('hidden');
    if (weightImperialError) weightImperialError.classList.add('hidden');

    if (selectedUnit === 'metric') {
        const heightCm = parseFloat(document.getElementById('heightCm').value);
        const weightKg = parseFloat(document.getElementById('currentWeightKg').value);

        if (!heightCm || heightCm < 100 || heightCm > 250 || heightCm <= 0) {
            if (heightError) heightError.classList.remove('hidden');
            hasError = true;
        }

        if (!weightKg || weightKg < 30 || weightKg > 300 || weightKg <= 0) {
            if (weightError) weightError.classList.remove('hidden');
            hasError = true;
        }

        if (hasError) return;

        height = heightCm;
        weight = weightKg;
    } else {
        const heightFt = parseFloat(document.getElementById('heightFt').value);
        const heightIn = parseFloat(document.getElementById('heightIn').value) || 0;
        const weightLbs = parseFloat(document.getElementById('currentWeightLbs').value);

        if (!heightFt || heightFt < 3 || heightFt > 8 || heightIn < 0 || heightIn > 11 || heightFt <= 0) {
            if (heightImperialError) heightImperialError.classList.remove('hidden');
            hasError = true;
        }

        if (!weightLbs || weightLbs < 66 || weightLbs > 660 || weightLbs <= 0) {
            if (weightImperialError) weightImperialError.classList.remove('hidden');
            hasError = true;
        }

        if (hasError) return;

        height = (heightFt * 12 + heightIn) * 2.54;
        weight = weightLbs * 0.453592;
    }

    userHeight = height;
    userWeight = weight;
    calculateAndDisplayBMI();
    nextQuestion();
}

const calculateAndDisplayBMI = () => {
    const heightM = userHeight / 100;
    const bmi = userWeight / (heightM * heightM);

    const bmiValueEl = document.getElementById('bmiValue');
    if (bmiValueEl) bmiValueEl.textContent = bmi.toFixed(1);

    let category = '';
    let description = '';
    let quote = '';
    let colorClass = '';
    let borderColor = '';

    if (bmi < 18.5) {
        category = t('paywall_screen.bmi_screen.quote.underweight.category');
        description = t('paywall_screen.bmi_screen.quote.underweight.description');
        quote = t('paywall_screen.bmi_screen.quote.underweight.quote');
        colorClass = 'text-red-600';
        borderColor = 'border-red-400';
    } else if (bmi < 25) {
        category = t('paywall_screen.bmi_screen.quote.normal.category');
        description = t('paywall_screen.bmi_screen.quote.normal.description');
        quote = t('paywall_screen.bmi_screen.quote.normal.quote');
        colorClass = 'text-green-600';
        borderColor = 'border-green-400';
    } else if (bmi < 30) {
        category = t('paywall_screen.bmi_screen.quote.overweight.category');
        description = t('paywall_screen.bmi_screen.quote.overweight.description');
        quote = t('paywall_screen.bmi_screen.quote.overweight.quote');
        colorClass = 'text-orange-600';
        borderColor = 'border-orange-400';
    } else {
        category = t('paywall_screen.bmi_screen.quote.obesity.category');
        description = t('paywall_screen.bmi_screen.quote.obesity.description');
        quote = t('paywall_screen.bmi_screen.quote.obesity.quote');
        colorClass = 'text-red-600';
        borderColor = 'border-red-400';
    }

    const bmiCategoryEl = document.getElementById('bmiCategory');
    const bmiDescriptionEl = document.getElementById('bmiDescription');
    const bmiQuoteTextEl = document.getElementById('bmiQuoteText');
    const bmiQuoteEl = document.getElementById('bmiQuote');

    if (bmiValueEl) bmiValueEl.className = `text-3xl font-bold mb-2 ${colorClass}`;
    if (bmiCategoryEl) {
        bmiCategoryEl.className = `text-base font-semibold mb-1 ${colorClass}`;
        bmiCategoryEl.textContent = category;
    }
    if (bmiDescriptionEl) bmiDescriptionEl.textContent = description;
    if (bmiQuoteTextEl) bmiQuoteTextEl.textContent = quote;
    if (bmiQuoteEl) bmiQuoteEl.className = `bg-white rounded-xl p-4 border-l-4 ${borderColor} mb-6`;
}

const validateTargetWeight = () => {
    let weight = parseFloat(document.getElementById('targetWeight').value);

    const targetWeightError = document.getElementById('targetWeightError');
    if (targetWeightError) targetWeightError.classList.add('hidden');

    if (!weight || weight < 30 || weight > 300 || weight <= 0) {
        if (targetWeightError) targetWeightError.classList.remove('hidden');
        return;
    }

    if (selectedUnit === 'imperial') {
        weight = weight * 0.453592;
    }

    targetWeight = weight;

    const difference = targetWeight - userWeight;
    const weightDiffElement = document.getElementById('weightDifference');
    const weightChangeText = document.getElementById('weightChangeText');

    if (weightDiffElement && weightChangeText && Math.abs(difference) > 0.1) {
        weightDiffElement.classList.remove('hidden');
        if (difference > 0) {
            weightChangeText.textContent = t('paywall_screen.goal_weight.wanna_gain') + ` ${Math.abs(difference).toFixed(1)} kg`;
            weightChangeText.className = 'text-green-600 font-medium';
        } else {
            weightChangeText.textContent = t('paywall_screen.goal_weight.wanna_lose') + ` ${Math.abs(difference).toFixed(1)} kg`;
            weightChangeText.className = 'text-blue-600 font-medium';
        }
    }

    nextQuestion();
}

const validateEmail = () => {
    const email = document.getElementById('userEmail').value;
    const emailError = document.getElementById('emailError');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailRegex.test(email)) {
        emailError.classList.remove('hidden');
        return;
    }

    emailError.classList.add('hidden');
    nextQuestion();
}

const simulatePaymentFailure = () => {
    const paymentIcon = document.getElementById('paymentIcon');
    const paymentTitle = document.getElementById('paymentTitle');
    const paymentMessage = document.getElementById('paymentMessage');
    const successDetails = document.getElementById('successDetails');

    paymentIcon.className = 'w-20 h-20 bg-gradient-to-r from-red-500 to-red-600 rounded-3xl mx-auto mb-6 flex items-center justify-center';
    paymentIcon.innerHTML = '<span class="text-3xl">❌</span>';

    paymentTitle.textContent = 'Thanh toán thất bại!';
    paymentTitle.className = 'text-3xl font-bold text-red-600 mb-4';

    paymentMessage.textContent = 'Rất tiếc, có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại hoặc liên hệ hỗ trợ.';

    successDetails.className = 'bg-red-50 rounded-2xl p-6 text-left';
    successDetails.innerHTML = `
                <h3 class="font-bold text-red-800 mb-3">Có thể do:</h3>
                <div class="space-y-2">
                    <div class="flex items-center">
                        <span class="text-red-500 mr-2">•</span>
                        <span class="text-sm text-gray-700">Thông tin thẻ không chính xác</span>
                    </div>
                    <div class="flex items-center">
                        <span class="text-red-500 mr-2">•</span>
                        <span class="text-sm text-gray-700">Số dư không đủ</span>
                    </div>
                    <div class="flex items-center">
                        <span class="text-red-500 mr-2">•</span>
                        <span class="text-sm text-gray-700">Lỗi kết nối mạng</span>
                    </div>
                    <div class="flex items-center">
                        <span class="text-red-500 mr-2">•</span>
                        <span class="text-sm text-gray-700">Thẻ bị khóa hoặc hết hạn</span>
                    </div>
                </div>
            `;
}

const nextQuestion = () => {
    const currentEl = document.getElementById(`question${currentQuestion}`);
    if (currentEl) currentEl.classList.add('hidden');

    currentQuestion++;

    // Special handling for loading screen
    if (currentQuestion === 24) {
        showLoadingScreen();
        return;
    }

    // Special handling for loading paywall
    if (currentQuestion === 28) {
        showLoadingPaywall();
        return;
    }

    if (currentQuestion <= totalQuestions) {
        const nextEl = document.getElementById(`question${currentQuestion}`);
        if (nextEl) {
            nextEl.classList.remove('hidden');

            const progress = (currentQuestion / totalQuestions) * 100;
            document.getElementById('progressBar').style.width = progress + '%';

            nextEl.classList.add('fade-in');
            setTimeout(() => {
                nextEl.classList.remove('fade-in');
            }, 600);
        }
    }
}

const showLoadingScreen = () => {
    const currentEl = document.getElementById(`question${currentQuestion}`);
    if (currentEl) {
        currentEl.classList.remove('hidden');
        currentEl.classList.add('fade-in');

        let progress = 0;
        const steps = ['step1', 'step2', 'step3', 'step4'];
        const stepTexts = [
            t('loading_screen.step_1'),
            t('loading_screen.step_2'),
            t('loading_screen.step_3'),
            t('loading_screen.step_4')
        ];

        const interval = setInterval(() => {
            progress += 2;

            // Update progress circle
            const progressCircle = document.getElementById('progressCircle');
            const progressText = document.getElementById('progressText');

            if (progressCircle && progressText) {
                progressCircle.style.background = `conic-gradient(#3b82f6 ${progress * 3.6}deg, #e5e7eb ${progress * 3.6}deg)`;
                progressText.textContent = `${progress}%`;
            }

            // Update steps
            const currentStep = Math.floor(progress / 25);
            if (currentStep < steps.length) {
                for (let i = 0; i <= currentStep; i++) {
                    const stepEl = document.getElementById(steps[i]);
                    if (stepEl && i < currentStep) {
                        stepEl.className = 'flex items-center text-left p-3 rounded-xl bg-green-50';
                        stepEl.innerHTML = `
                                    <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                                        <span class="text-white text-sm">✓</span>
                                    </div>
                                    <span class="text-gray-700">${stepTexts[i]}</span>
                                `;
                    } else if (stepEl && i === currentStep) {
                        stepEl.className = 'flex items-center text-left p-3 rounded-xl bg-blue-50';
                        stepEl.innerHTML = `
                                    <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                                        <div class="loading-circle w-4 h-4 border-2 border-white border-t-transparent"></div>
                                    </div>
                                    <span class="text-gray-700">${stepTexts[i]}</span>
                                `;
                    }
                }
            }

            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    nextQuestion();
                }, 1000);
            }
        }, 100);
    }
}

const showLoadingPaywall = () => {
    const currentEl = document.getElementById(`question${currentQuestion}`);
    if (currentEl) {
        currentEl.classList.remove('hidden');
        currentEl.classList.add('fade-in');

        // Update summary with user data
        updateSummaryData();

        // Show CTA button after 2 seconds
        setTimeout(() => {
            showPaywallCTA();
        }, 2000);
    }
}

const showPaywallCTA = () => {
    const loadingCircle = document.getElementById('loadingCirclePaywall');
    const loadingText = document.getElementById('loadingTextPaywall');

    if (loadingCircle) {
        loadingCircle.style.display = 'none';
    }

    if (loadingText) {
        loadingText.outerHTML = `
                    <button class="cta-button w-full py-4 text-white font-semibold rounded-2xl text-lg bg-blue" onclick="nextQuestion()" style="background-color: #007bff!important;">
                        Chọn gói Premium của bạn
                    </button>
                `;
    }
}

const updateSummaryData = () => {
    // Update goal
    const goalMap = {
        'lose_weight': t('summary_screen.lose_weight'),
        'maintain_weight': t('summary_screen.maintain_weight'),
        'gain_weight': t('summary_screen.gain_weight'),
        'healthy_eating': t('summary_screen.healthy_eating')
    };

    const goalSummary = document.getElementById('userGoalSummary');
    if (goalSummary && selectedGoal) {
        goalSummary.textContent = goalMap[selectedGoal] || t('summary_screen.lose_weight');
    }

    // Update target weight
    const targetSummary = document.getElementById('targetWeightSummary');
    if (targetSummary && targetWeight > 0) {
        const unit = selectedUnit === 'metric' ? 'kg' : 'lbs';
        const displayWeight = selectedUnit === 'metric' ? targetWeight : (targetWeight * 2.20462);
        targetSummary.textContent = `${displayWeight.toFixed(1)} ${unit}`;
    }

    // Update timeline
    const timelineSummary = document.getElementById('timelineSummary');
    if (timelineSummary && selectedTimeline) {
        timelineSummary.textContent = selectedTimeline;
    }
}

const goToReview = (index) => {
    currentReviewIndex = index;
    const slider = document.getElementById('reviewSlider');
    const dots = document.querySelectorAll('#question29 .flex.justify-center button');

    if (slider) {
        slider.style.transform = `translateX(-${index * 100}%)`;
    }

    // Update dots
    dots.forEach((dot, i) => {
        if (i === index) {
            dot.className = 'w-2 h-2 bg-blue-500 rounded-full';
        } else {
            dot.className = 'w-2 h-2 bg-gray-300 rounded-full';
        }
    });
}

const selectPlan = (planType) => {
    // Simulate Stripe payment redirect
    const stripeUrl = planType === 'monthly'
        ? 'https://buy.stripe.com/test_monthly_plan'
        : 'https://buy.stripe.com/test_yearly_plan';

    // In a real implementation, you would redirect to Stripe
    // window.location.href = stripeUrl;

    // For demo purposes, simulate payment processing
    showPaymentProcessing(planType);
}

const showPaymentProcessing = (planType) => {
    // Show loading state
    const paymentModal = document.createElement('div');
    paymentModal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    paymentModal.innerHTML = `
                <div class="bg-white rounded-3xl p-8 max-w-md mx-4 text-center">
                    <div class="loading-circle mb-4"></div>
                    <h3 class="text-xl font-bold text-gray-800 mb-2">Processing payment...</h3>
                    <p class="text-gray-600">Please wait for a moment</p>
                </div>
            `;

    document.body.appendChild(paymentModal);

    // Simulate payment processing time
    setTimeout(() => {
        document.body.removeChild(paymentModal);
        nextQuestion(); // Go to success page
    }, 3000);
}

// Auto-slide reviews
const startReviewSlider = () => {
    setInterval(() => {
        currentReviewIndex = (currentReviewIndex + 1) % 5;
        goToReview(currentReviewIndex);
    }, 4000);
}

// Close language menu when clicking outside
document.addEventListener('click', function (event) {
    const menu = document.getElementById('languageMenu');
    const btn = document.getElementById('languageBtn');
    if (menu && btn && !menu.contains(event.target) && !btn.contains(event.target)) {
        menu.classList.add('hidden');
    }
});

// Start review slider when paywall is shown
document.addEventListener('DOMContentLoaded', function () {
    setTimeout(() => {
        if (currentQuestion === 29) {
            startReviewSlider();
        }
    }, 1000);
});

// Real-time weight difference calculation
document.addEventListener('DOMContentLoaded', function () {
    const targetWeightInput = document.getElementById('targetWeight');
    if (targetWeightInput) {
        targetWeightInput.addEventListener('input', function () {
            const weight = parseFloat(this.value);
            if (weight && userWeight > 0) {
                let convertedWeight = weight;
                if (selectedUnit === 'imperial') {
                    convertedWeight = weight * 0.453592;
                }

                const difference = convertedWeight - userWeight;
                const weightDiffElement = document.getElementById('weightDifference');
                const weightChangeText = document.getElementById('weightChangeText');

                if (weightDiffElement && weightChangeText && Math.abs(difference) > 0.1) {
                    weightDiffElement.classList.remove('hidden');
                    if (difference > 0) {
                        weightChangeText.textContent = t('paywall_screen.goal_weight.wanna_gain') + ` ${Math.abs(difference).toFixed(1)} kg`;
                        weightChangeText.className = 'text-green-600 font-medium';
                    } else {
                        weightChangeText.textContent = t('paywall_screen.goal_weight.wanna_lose') + ` ${Math.abs(difference).toFixed(1)} kg`;
                        weightChangeText.className = 'text-blue-600 font-medium';
                    }
                } else if (weightDiffElement) {
                    weightDiffElement.classList.add('hidden');
                }
            }
        });
    }
});

window.nextQuestion = nextQuestion;
window.showLoadingScreen = showLoadingScreen;
window.showLoadingPaywall = showLoadingPaywall;
window.showPaywallCTA = showPaywallCTA;
window.updateSummaryData = updateSummaryData;
window.goToReview = goToReview;
window.selectPlan = selectPlan;
window.showPaymentProcessing = showPaymentProcessing;
window.startReviewSlider = startReviewSlider;
window.toggleLanguageMenu = toggleLanguageMenu;
window.changeLanguage = changeLanguage;
window.selectGoal = selectGoal;
window.selectTimeline = selectTimeline;
window.toggleUnit = toggleUnit;
window.validateHeightWeight = validateHeightWeight;
window.calculateAndDisplayBMI = calculateAndDisplayBMI;
window.validateTargetWeight = validateTargetWeight;
window.validateEmail = validateEmail;
window.simulatePaymentFailure = simulatePaymentFailure;

</script>



<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

:global(body) {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif !important;
    background: linear-gradient(135deg, #1f2937 0%, #111827 100%) !important;
    min-height: 100vh !important;
}

.question-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6rem 1rem 4rem 1rem;
}

.fade-in {
    animation: fadeIn 0.6s ease-in-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(30px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.progress-bar {
    transition: width 0.4s ease-in-out;
    background: linear-gradient(90deg, #7084a5, #7084a5);
}

.option-button {
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
    background: rgba(255, 255, 255, 0.95);
    border: 2px solid rgba(255, 255, 255, 0.2);
}

.option-button:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
    background: rgba(255, 255, 255, 1);
    border-color: #374151;
}

.cta-button {
    background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
    transition: all 0.3s ease;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}

.cta-button:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
    background: linear-gradient(135deg, #374151 0%, #1f2937 100%);
}

.card {
    backdrop-filter: blur(20px);
    background: rgba(255, 255, 255, 0.95);
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.premium-card {
    background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
    border: 2px solid #374151;
}

.floating-elements {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    pointer-events: none;
}

.floating-circle {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    animation: float 6s ease-in-out infinite;
}

@keyframes float {

    0%,
    100% {
        transform: translateY(0px) rotate(0deg);
    }

    50% {
        transform: translateY(-20px) rotate(180deg);
    }
}

.step-indicator {
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
}

.error-message {
    color: #dc2626;
    font-size: 0.875rem;
    margin-top: 0.5rem;
}

.highlight-box {
    background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
    border: 2px solid #2563eb;
    border-radius: 1rem;
    padding: 1rem;
    margin: 0.5rem;
    color: white;
    font-weight: bold;
    font-size: 1.5rem;
    text-align: center;
    box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
}

.highlight-box-green {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    border: 2px solid #047857;
    border-radius: 1rem;
    padding: 1rem;
    margin: 0.5rem;
    color: white;
    font-weight: bold;
    font-size: 1.5rem;
    text-align: center;
    box-shadow: 0 8px 25px rgba(16, 185, 129, 0.3);
}

.loading-circle {
    width: 120px;
    height: 120px;
    border: 8px solid #e5e7eb;
    border-top: 8px solid #3b82f6;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.progress-circle {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background: conic-gradient(#3b82f6 0deg, #e5e7eb 0deg);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    position: relative;
}

.progress-circle::before {
    content: '';
    width: 90px;
    height: 90px;
    border-radius: 50%;
    background: white;
    position: absolute;
}

.progress-text {
    position: relative;
    z-index: 1;
    font-weight: bold;
    font-size: 1.2rem;
    color: #1f2937;
}

/* Custom animations for yearly plan */
.animate-pulse-glow {
    animation: pulseGlow 3s ease-in-out infinite;
}

@keyframes pulseGlow {

    0%,
    100% {
        box-shadow: 0 0 20px rgba(251, 191, 36, 0.5);
        transform: scale(1);
    }

    50% {
        box-shadow: 0 0 30px rgba(251, 191, 36, 0.8);
        transform: scale(1.02);
    }
}

.animate-bounce-subtle {
    animation: bounceSubtle 2s ease-in-out infinite;
}

@keyframes bounceSubtle {

    0%,
    100% {
        transform: rotate(12deg) translateY(0px);
    }

    50% {
        transform: rotate(12deg) translateY(-5px);
    }
}

.animate-spin-slow {
    animation: spinSlow 8s linear infinite;
}

@keyframes spinSlow {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

.animate-pulse-button {
    animation: pulseButton 2s ease-in-out infinite;
}

@keyframes pulseButton {

    0%,
    100% {
        box-shadow: 0 0 15px rgba(251, 191, 36, 0.6);
        transform: scale(1);
    }

    50% {
        box-shadow: 0 0 25px rgba(251, 191, 36, 0.9);
        transform: scale(1.05);
    }
}

.yearly-cta-button:hover {
    animation: none;
    transform: scale(1.08) !important;
    box-shadow: 0 0 30px rgba(251, 191, 36, 1) !important;
}
</style>
