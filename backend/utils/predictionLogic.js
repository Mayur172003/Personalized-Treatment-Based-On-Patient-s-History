/**
 * Rule-based diabetes prediction and diet/exercise plan (ported from PHP analysis.php).
 * Prediction: Diabetic if flag3>0, Prediabetic if flag2>0, else Healthy.
 */

export function computeAnalysis(input) {
  const a = Number(input.age);
  const h = Number(input.height);
  const w = Number(input.weight);
  const i1 = Number(input.insulin1);
  const i2 = Number(input.insulin2);
  const g1 = Number(input.glucose1);
  const g2 = Number(input.glucose2);
  const dpf = Number(input.diabetesPedigreeFunction);
  const b1 = Number(input.bloodPressure1);
  const b2 = Number(input.bloodPressure2);
  const a1 = Number(input.haemoglobinA1C);
  const o = Number(input.oralGlucoseToleranceTest);

  let flag2 = 0;
  let flag3 = 0;
  let e1, e2, e3, e4, e5, e6, e7, e8, e9, e10, e11;
  let d1, d2, d3, d4, d5;
  let et1 = 0, et2 = 0, et3 = 0, et4 = 0, et5 = 0, et6 = 0, et7 = 0, et8 = 0, et9 = 0, et10 = 0, et11 = 0;
  let dt1 = 0, dt2 = 0, dt3 = 0, dt4 = 0, dt5 = 0;

  // e1, d1 by age
  if (a <= 23) {
    e1 = '28 pushup '; d1 = 'One poached egg and half a small avocado spread on one slice of Ezekiel bread, one orange. Total carbs: Approximately 39'; et1 = 42; dt1 = 39;
  } else if (a <= 27) {
    e1 = '30 push up '; d1 = '1 cup (100g) cooked oatmeal, three-quarters of a cup blueberries, 1 oz almonds, 1 teaspoon (tsp) chia seeds. Total carbs: Approximately 34'; et1 = 45; dt1 = 34;
  } else if (a <= 31) {
    e1 = '32 push up'; d1 = 'Two-egg veggie omelet (spinach, mushrooms, bell pepper, avocado) with a half cup black beans, three-quarters cup blueberries. Total carbs: Approximately 34.'; et1 = 48; dt1 = 34;
  } else if (a <= 35) {
    e1 = '35 push up'; d1 = 'Sweet potato toast: two slices (100 g) toasted sweet potato, topped with 1 oz goat cheese, spinach, and 1 tsp sprinkled flaxseed. Total carbs: Approximately 44'; et1 = 52.5; dt1 = 44;
  } else if (a <= 39) {
    e1 = '33 push up'; d1 = 'A one-third cup of Grape-Nuts (or similar high-fiber cereal), half a cup blueberries, 1 cup unsweetened almond milk. Total carbs: Approximately 41.'; et1 = 49.5; dt1 = 41;
  } else if (a <= 43) {
    e1 = '18 lunges'; d1 = '1 cup low-fat plain Greek yogurt sweetened with half a banana mashed, 1 cup strawberries, 1 tbsp chia seeds. Total carbs: Approximately 32.'; et1 = 61.2; dt1 = 32;
  } else if (a <= 47) {
    e1 = '15 lunges'; d1 = 'Chocolate peanut oatmeal: 1 cup cooked oatmeal, 1 scoop chocolate vegan or whey protein powder, 1 tbsp peanut butter, 1 tbsp chia seeds. Total carbs: Approximately 21.'; et1 = 51; dt1 = 21;
  } else if (a <= 51) {
    e1 = '21 squats'; d1 = 'One poached egg and half a small avocado spread on one slice of Ezekiel bread, one orange. Total carbs: Approximately 39.'; et1 = 21; dt1 = 39;
  } else if (a <= 55) {
    e1 = '10 squats'; d1 = '1 cup (100 g) cooked oatmeal, three-quarters cup blueberries, 1 oz almonds, 2 tsp chia seeds. Total carbs: Approximately 39.'; et1 = 10; dt1 = 39;
  } else {
    e1 = '10 min brisk walk'; d1 = 'Omelet: two-egg veggie omelet (spinach, mushrooms, bell pepper, avocado) with half a cup black beans, 1 cup blueberries. Total carbs: Approximately 43.'; et1 = 36.8; dt1 = 43;
  }

  // e2, d2 by height
  if (h <= 140) {
    e2 = '10 dumbbell rows'; d2 = 'Mexican bowl: two-thirds of a cup low-sodium canned pinto beans, 1 cup chopped spinach, a quarter cup chopped tomatoes, a quarter cup bell peppers, 1 ounce (oz) cheese, 1 tablespoon (tbsp) salsa as sauce. Total carbs: Approximately 30.'; et2 = 25; dt2 = 30;
  } else if (h <= 142.5) {
    e2 = '17 dumbell rows'; d2 = 'Salad: 2 cups fresh spinach, 2 oz grilled chicken breast, half a cup chickpeas, half a small avocado, a half cup sliced strawberries, one quarter cup shredded carrots, 2 tbsp dressing. Total carbs: Approximately 52.'; et2 = 42.5; dt2 = 52;
  } else if (h <= 145) {
    e2 = '20 dumbell rows'; d2 = 'Sandwich: two regular slices high-fiber whole grain bread, 1 tbsp plain, no-fat Greek yogurt and 1 tbsp mustard, 2 oz canned tuna in water mixed with a quarter cup of shredded carrots, 1 tbsp dill relish, 1 cup sliced tomato, half a medium apple. Total carbs: Approximately 40.'; et2 = 50; dt2 = 40;
  } else if (h <= 147.5) {
    e2 = '25 dumbell rows'; d2 = '2 oz roast chicken, 1 cup raw cauliflower, 1 tbsp low-fat French dressing, 1 cup fresh strawberries. Total carbs: Approximately 23.'; et2 = 62.5; dt2 = 23;
  } else if (h <= 150) {
    e2 = '16 Jump Squats'; d2 = 'Salad: 2 cups spinach, a quarter cup tomatoes, 1 oz cheddar cheese, one boiled chopped egg, 2 tbsp yogurt dressing, a quarter cup grapes, 1 tsp pumpkin seeds, 2 oz roasted chickpeas. Total carbs: Approximately 47.'; et2 = 48; dt2 = 47;
  } else if (h <= 152.5) {
    e2 = '18 Jump Squats'; d2 = 'Tacos: two corn tortillas, a one-third cup cooked black beans, 1 oz low-fat cheese, 2 tbsp avocado, 1 cup coleslaw, salsa as dressing. Total carbs: Approximately 70.'; et2 = 54; dt2 = 70;
  } else if (h <= 155) {
    e2 = '20 Jump Squats'; d2 = 'One small whole wheat pita pocket, half a cup cucumber, half a cup tomatoes, half a cup lentils, half a cup leafy greens, 2 tbsp salad dressing. Total carbs: Approximately 30.'; et2 = 60; dt2 = 30;
  } else if (h <= 157.5) {
    e2 = '23 Jump Squats'; d2 = 'Mexican bowl: a one-third cup brown rice, two-thirds cup home-made baked beans, 1 cup chopped spinach, a quarter cup chopped tomatoes, a quarter cup bell peppers, 1.5 oz cheese, 1 tbsp salsa as sauce. Total carbs: Approximately 43.'; et2 = 69; dt2 = 43;
  } else if (h <= 160) {
    e2 = '25 Jump Squats'; d2 = 'Salad: 2 cups fresh spinach, 3 oz grilled chicken breast, half a cup chickpeas, half a small avocado, half a cup sliced strawberries, a quarter cup shredded carrots, 2 tbsp low-fat French dressing. Total carbs: Approximately 49.'; et2 = 75; dt2 = 49;
  } else {
    e2 = '28 Jump Squats '; d2 = 'Sandwich: two regular slices high-fiber whole grain bread, 1 tbsp Greek plain, no-fat yogurt and 1 tbsp mustard, 3 oz canned tuna in water mixed with a quarter cup of shredded carrots, 1 tbsp dill relish, 1 cup sliced tomato, half a medium apple. Total carbs: Approximately 43.'; et2 = 84; dt2 = 43;
  }

  // e3, d3 by weight
  if (w <= 40) {
    e3 = 'Not Possible'; d3 = '20 1-gram baby carrots with 2 tbsp hummus. Total carbs: Approximately 21.'; dt3 = 21;
  } else if (w <= 45) {
    e3 = '8 burpees '; d3 = 'One small peach diced into one-third cup 2% cottage cheese. Total carbs: Approximately 16.'; et3 = 40; dt3 = 16;
  } else if (w <= 50) {
    e3 = '10 burpees'; d3 = '1 cup unsweetened kefir. Total carbs: Approximately 12.'; et3 = 50; dt3 = 12;
  } else if (w <= 55) {
    e3 = '12 burpees'; d3 = '1 cup low-fat plain Greek yogurt mixed with half a small banana. Total carbs: Approximately 15.'; et3 = 60; dt3 = 15;
  } else if (w <= 60) {
    e3 = '15 burpees'; d3 = '1 cup celery with 1 tbsp peanut butter. Total carbs: Approximately 6.'; et3 = 75; dt3 = 6;
  } else if (w <= 65) {
    e3 = '18 burpees'; d3 = 'One cherry tomato and 10 baby carrots with 2 tbsp hummus. Total carbs: Approximately 14.'; et3 = 90; dt3 = 14;
  } else if (w <= 70) {
    e3 = '8 plank leg raises'; d3 = '1 oz almonds, one small grapefruit. Total carbs: Approximately 26.'; et3 = 24; dt3 = 26;
  } else if (w <= 75) {
    e3 = '10 plank leg raises'; d3 = '20 10-gram baby carrots with 2 tbsp hummus. Total carbs: Approximately 21.'; et3 = 30; dt3 = 21;
  } else if (w <= 80) {
    e3 = '13 plank leg raises'; d3 = 'One small peach diced into one third of a cup 2% fat cottage cheese. Total carbs: Approximately 16.'; et3 = 39; dt3 = 16;
  } else {
    e3 = '15 plank leg raises'; d3 = '20 peanuts, 1 cup carrots. Total carbs: Approximately 15.'; et3 = 45; dt3 = 15;
  }

  // e4, d4 by insulin1
  if (i1 <= 10) {
    e4 = 'Not possible';
  } else if (i1 <= 12) {
    e4 = '7 sit ups'; d4 = '1 cup cooked lentil penne pasta, 1.5 cups veggie tomato sauce (cook garlic, mushrooms, greens, zucchini, and eggplant into it), 2 oz ground lean turkey. Total carbs: Approximately 35.'; et4 = 18.9; dt4 = 35;
  } else if (i1 <= 15) {
    e4 = '10 sit ups'; d4 = 'Mediterranean couscous: two-thirds cup whole wheat cooked couscous, half a cup sautéed eggplant, four sundried tomatoes, five jumbo olives chopped, half a diced cucumber, 1 tbsp balsamic vinegar, fresh basil. Total carbs: Approximately 38.'; et4 = 27; dt4 = 38;
  } else if (i1 <= 18) {
    e4 = '13 sit ups '; d4 = 'Half a cup (50g) succotash, 1 tsp butter, 2 oz pork tenderloin, 1 cup cooked asparagus, half a cup fresh pineapple. Total carbs: Approximately 34.'; et4 = 35.1; dt4 = 34;
  } else if (i1 <= 20) {
    e4 = '15 sit ups'; d4 = 'A two-thirds cup of quinoa, 8 oz silken tofu, 1 cup cooked bok choy, 1 cup steamed broccoli, 2 tsp olive oil, one kiwi. Total carbs: Approximately 44.'; et4 = 40.5; dt4 = 44;
  } else if (i1 <= 24) {
    e4 = '17 sit ups'; d4 = '2 oz salmon filet, one medium baked potato, 1 tsp butter, 1.5 cups steamed asparagus. Total carbs: Approximately 39.'; et4 = 45.9; dt4 = 39;
  } else if (i1 <= 28) {
    e4 = '10 bicycle crunches'; d4 = 'Half medium baked potato with skin, 2 oz broiled beef, 1 tsp butter, 1.5 cups steamed broccoli with 1 tsp nutritional yeast sprinkled on top, three-quarters cup whole strawberries. Total carbs: Approximately 41.'; et4 = 30; dt4 = 41;
  } else if (i1 <= 32) {
    e4 = '13 bicycle crunches'; d4 = '2 oz boiled shrimp, 1 cup green peas, 1 tsp butter, half a cup cooked beets, 1 cup sauteed Swiss chard, 1 tsp balsamic vinegar. Total carbs: Approximately 39.'; et4 = 39; dt4 = 39;
  } else if (i1 <= 37) {
    e4 = '15 bicycle crunches'; d4 = '1 cup cooked lentil penne pasta, 1.5 cups veggie tomato sauce (cook garlic, mushrooms, greens, zucchini, and eggplant into it), 2 oz ground lean turkey. Total carbs: Approximately 35.'; et4 = 45; dt4 = 35;
  } else if (i1 <= 42) {
    e4 = '17 bicycle crunches'; d4 = 'Mediterranean couscous: two-thirds cup cooked whole wheat couscous, half a cup sauteed eggplant, four sundried tomatoes, five jumbo olives chopped, half a diced cucumber, 1 tbsp balsamic vinegar, fresh basil. Total carbs: Approximately 38.'; et4 = 51; dt4 = 38;
  } else {
    e4 = '19 bicycle crunches '; d4 = 'half a cup (50 g) succotash, 1.5 oz cornbread, 1 tsp butter, 3 oz pork tenderloin, 1 cup cooked asparagus, half a cup fresh pineapple. Total carbs: Approximately 47.'; et4 = 57; dt4 = 47;
  }

  // e5 by insulin2 (no d5)
  if (i2 <= 10) e5 = 'Not possible';
  else if (i2 <= 12) { e5 = '7 Jump Jacks'; et5 = 21; }
  else if (i2 <= 15) { e5 = '10 Jump Jacks'; et5 = 30; }
  else if (i2 <= 40) { e5 = '12 Jump Jacks '; et5 = 36; }
  else if (i2 <= 60) { e5 = '15 Jump Jacks'; et5 = 45; }
  else if (i2 <= 80) { e5 = '18 Jump Jacks '; et5 = 54; }
  else if (i2 <= 100) { e5 = '8 reverse crunches'; et5 = 20; }
  else if (i2 <= 130) { e5 = '12 reverse crunches'; et5 = 30; }
  else if (i2 <= 145) { e5 = '15 reverse crunches'; et5 = 37.5; }
  else if (i2 <= 165) { e5 = '18 reverse crunches'; et5 = 45; }
  else { e5 = '20 reverse crunches'; et5 = 50; }

  // e6 by glucose1 (flag2, flag3)
  if (g1 <= 35) e6 = 'not possible';
  else if (g1 <= 45) { e6 = '30 min brisk walk'; et6 = 45; }
  else if (g1 <= 60) { e6 = '35 min jogging'; et6 = 52.5; }
  else if (g1 <= 75) { e6 = '33 min cycling  '; et6 = 47.8; }
  else if (g1 <= 85) { e6 = '40 min brisk walk'; et6 = 55; }
  else if (g1 <= 95) { e6 = '45 min jogging'; et6 = 67.9; }
  else if (g1 <= 100) { e6 = '38 min bicycle ride'; et6 = 58.3; }
  else if (g1 <= 110) { e6 = '25 min swimming/run'; et6 = 31.4; flag2++; }
  else if (g1 <= 125) { e6 = '30 min swimming/run'; et6 = 31.4; flag2++; }
  else { e6 = '35 min swimming/run'; et6 = 42.8; flag3++; }

  // e7, d5 by glucose2
  if (g2 <= 30) e7 = 'Not Possible';
  else if (g2 <= 40) { e7 = '8 climbers'; d5 = '1 oz pumpkin seeds, one medium apple. Total carbs: Approximately 26.'; et7 = 16; dt5 = 26; }
  else if (g2 <= 55) { e7 = '10 climbers'; d5 = '16 pistachios, 1 cup jicama. Total carbs: Approximately 15.'; et7 = 20; dt5 = 15; }
  else if (g2 <= 70) { e7 = '15 climbers'; d5 = 'One cherry tomato and 10 baby carrots with 2 tbsp hummus. Total carbs: Approximately 14.'; et7 = 30; dt5 = 14; }
  else if (g2 <= 85) { e7 = '18 climbers'; d5 = 'Half a small avocado drizzled with hot sauce. Total carbs: Approximately 9.'; et7 = 36; dt5 = 9; }
  else if (g2 <= 100) { e7 = '20 climbers'; d5 = '1 cup celery with 1 tbsp peanut butter. Total carbs: Approximately 6.'; et7 = 40; dt5 = 6; }
  else if (g2 <= 115) { e7 = '10 high knees'; d5 = 'A half cup vegetable juice, 10 stuffed green olives. Total carbs: Approximately 24.'; et7 = 30; dt5 = 24; }
  else if (g2 <= 120) { e7 = '12 high knees'; d5 = '1 cup low-fat plain Greek yogurt mixed with half a small banana. Total carbs: Approximately 15.'; et7 = 36; dt5 = 15; }
  else if (g2 <= 130) { e7 = '13 high knees'; d5 = '1 cup celery, 1.5 tsp peanut butter. Total carbs: Approximately 6.'; et7 = 39; dt5 = 6; }
  else if (g2 <= 140) { e7 = '14 high knees'; d5 = 'One apple with 2 tsp almond butter. Total carbs: Approximately 16.'; et7 = 42; dt5 = 16; }
  else { e7 = '17 high knees'; d5 = '20 peanuts, 1 cup carrots. Total carbs: Approximately 15.'; et7 = 51; dt5 = 15; }

  // e8 by bp1
  if (b1 <= 90) e8 = 'Not possible';
  else if (b1 <= 95) { e8 = '9 Crunches'; et8 = 63; }
  else if (b1 <= 100) { e8 = '12 Crunches'; et8 = 84; }
  else if (b1 <= 105) { e8 = '14 Crunches'; et8 = 98; }
  else if (b1 <= 110) { e8 = '18 Crunches'; et8 = 126; }
  else if (b1 <= 115) { e8 = '8 pilates'; et8 = 16; }
  else if (b1 <= 120) { e8 = '11 pilates'; et8 = 22; }
  else if (b1 <= 130) { e8 = '13 pilates'; et8 = 26; }
  else if (b1 <= 135) { e8 = '15 pilates'; et8 = 30; }
  else if (b1 <= 140) { e8 = '17 pilates'; et8 = 34; }
  else { e8 = '18 pilates '; et8 = 36; }

  // e9 by bp2
  if (b2 <= 60) e9 = 'Not possible';
  else if (b2 <= 65) { e9 = '8 Russian Twists'; et9 = 40; }
  else if (b2 <= 75) { e9 = '10 Russian Twists'; et9 = 50; }
  else if (b2 <= 80) { e9 = '12 Russian Twists'; et9 = 60; }
  else if (b2 <= 90) { e9 = '8 knee pullins'; et9 = 48; }
  else if (b2 <= 95) { e9 = '10 knee pullins'; et9 = 60; }
  else { e9 = '15 knee pullins'; et9 = 90; }

  // e10 by a1c (flag2, flag3)
  if (a1 <= 60) e10 = 'Not possible';
  else if (a1 <= 117) { e10 = '10 leg raises'; et10 = 50; }
  else if (a1 <= 120) { e10 = '15 leg raises'; et10 = 75; flag2++; }
  else if (a1 <= 123) { e10 = '20 leg raises'; et10 = 100; flag2++; }
  else if (a1 <= 127) { e10 = '25 leg raises'; et10 = 125; flag2++; }
  else if (a1 <= 130) { e10 = '10 Mountain Climbers'; et10 = 70; flag2++; }
  else if (a1 <= 134) { e10 = '15 Mountain Climbers'; et10 = 105; flag2++; }
  else if (a1 <= 137) { e10 = '20 Mountain Climbers'; et10 = 140; flag2++; }
  else { e10 = '22 Mountain Climbers'; et10 = 154; flag3++; }

  // e11 by ogtt (flag2, flag3)
  if (o <= 70) e11 = 'Not Possible';
  else if (o <= 140) { e11 = '10 jumping ropes '; et11 = 150; }
  else if (o <= 160) { e11 = '15 jumping ropes'; et11 = 225; flag2++; }
  else if (o <= 180) { e11 = '10 pilates'; et11 = 120; flag2++; }
  else if (o <= 199) { e11 = '20 pilates'; et11 = 240; flag2++; }
  else { e11 = '25 pilates '; et11 = 300; flag3++; }

  const et = (et1 || 0) + (et2 || 0) + (et3 || 0) + (et4 || 0) + (et5 || 0) + (et6 || 0) + (et7 || 0) + (et8 || 0) + (et9 || 0) + (et10 || 0) + (et11 || 0);
  const dt = (dt1 || 0) + (dt2 || 0) + (dt3 || 0) + (dt4 || 0) + (dt5 || 0);

  let prediction = 'Healthy/ No Diabetes';
  if (flag3 !== 0) prediction = 'Diabetic';
  else if (flag2 !== 0) prediction = 'Prediabetic';

  return {
    prediction,
    diet: {
      d1: d1 || '',
      d2: d2 || '',
      d3: d3 || '',
      d4: d4 || '',
      d5: d5 || '',
      total: Math.round(dt * 100) / 100,
    },
    exercise: {
      e1: e1 || '',
      e2: e2 || '',
      e3: e3 || '',
      e4: e4 || '',
      e5: e5 || '',
      e6: e6 || '',
      e7: e7 || '',
      e8: e8 || '',
      e9: e9 || '',
      e10: e10 || '',
      e11: e11 || '',
      total: Math.round(et * 100) / 100,
    },
  };
}

export function validateAnalysisInput(input) {
  const a = Number(input.age);
  const h = Number(input.height);
  const w = Number(input.weight);
  const i1 = Number(input.insulin1);
  const i2 = Number(input.insulin2);
  const g1 = Number(input.glucose1);
  const g2 = Number(input.glucose2);
  const b1 = Number(input.bloodPressure1);
  const b2 = Number(input.bloodPressure2);
  const dpf = Number(input.diabetesPedigreeFunction);
  const a1 = Number(input.haemoglobinA1C);
  const o = Number(input.oralGlucoseToleranceTest);
  const errors = [];
  if (!input.age || a < 18) errors.push('Age cannot be less than 18 years');
  if (!input.height || h < 100) errors.push('Height cannot be less than 100 cm');
  if (!input.weight || w < 50) errors.push('Weight cannot be less than 50 kgs');
  if (!input.insulin1 || i1 < 10) errors.push('Insulin before meal cannot be less than 10 mIU/L');
  if (!input.insulin2 || i2 < 16) errors.push('Insulin after meal cannot be less than 16 mIU/L');
  if (!input.glucose1 || g1 < 50) errors.push('Glucose before meal cannot be less than 50 mgs/dL');
  if (!input.glucose2 || g2 < 50) errors.push('Glucose after meal cannot be less than 50 mgs/dL');
  if (!input.bloodPressure1 || b1 < 90) errors.push('Systolic Blood Pressure cannot be less than 90 mm/Hg');
  if (!input.bloodPressure2 || b2 < 60) errors.push('Diastolic Blood Pressure cannot be less than 60 mm/Hg');
  if (dpf < 0) errors.push('Diabetes Pedigree Function cannot be less than zero');
  if (!input.haemoglobinA1C || a1 < 60) errors.push('A1C Test Results cannot be less than 60 mg/dL');
  if (!input.oralGlucoseToleranceTest || o < 70) errors.push('OGTT Test Results cannot be less than 70 mg/dL');
  return errors;
}
