export function calculateCalories() {
    let gender = localStorage.getItem('gender');
    let year_of_birth = parseInt(localStorage.getItem('year_of_birth'));
    let current_weight = parseFloat(localStorage.getItem('current_weight'));
    let current_height = parseFloat(localStorage.getItem('current_height'));
    let goal = localStorage.getItem('goal');
    let goal_weight = parseFloat(localStorage.getItem('goal_weight'));
    let duration = parseInt(localStorage.getItem('duration'));
    let activity = parseFloat(localStorage.getItem('activity'));
    let measure_type = localStorage.getItem('measure_type');
    let unit = localStorage.getItem('unit'); // week | month | year

    // Đổi đơn vị nếu là imperial
    if (measure_type === 'imperial') {
        current_weight *= 0.453592; // lbs → kg
        goal_weight *= 0.453592;
        current_height *= 2.54; // inch → cm
    }

    // Tính tuổi
    const currentYear = new Date().getFullYear();
    const age = currentYear - year_of_birth;

    // Tính BMR
    let BMR = 0;
    if (gender === 'male') {
        BMR = (10 * current_weight) + (6.25 * current_height) - (5 * age) + 5;
    } else {
        BMR = (10 * current_weight) + (6.25 * current_height) - (5 * age) - 161;
    }

    // Ngày bắt đầu: ngày mai
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + 1);

    // Ngày kết thúc tùy theo đơn vị
    const endDate = new Date(startDate);
    if (unit === 'week') {
        endDate.setDate(endDate.getDate() + duration * 7);
    } else if (unit === 'month') {
        endDate.setMonth(endDate.getMonth() + duration);
    } else if (unit === 'year') {
        endDate.setFullYear(endDate.getFullYear() + duration);
    }

    // Tính số ngày thực tế
    const durationDays = Math.round((endDate - startDate) / (1000 * 60 * 60 * 24));

    // Tính gain/lose calories
    let gainLossCalories = 0;
    if (goal === 'gain' || goal === 'lose') {
        gainLossCalories = ((goal_weight - current_weight) / durationDays) * 7700;
    }

    const targetCalories = Math.round((BMR * activity) + gainLossCalories);
    const unhappyCase = targetCalories <= 0;

    // Format endDate → "Sep 21, 2025"
    const formattedEndDate = endDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    // end_date yyyy-mm-dd
    const end_date = endDate.toISOString().split('T')[0];
    const start_date = startDate.toISOString().split('T')[0];
    //lưu vào localStorage
    localStorage.setItem('target_cal', targetCalories);
    localStorage.setItem('end_date', end_date);
    localStorage.setItem('start_date', start_date);

    return {
        targetCalories,
        endDate: formattedEndDate,
        unhappyCase,
        durationDays
    };
}
