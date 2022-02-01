FactoryBot.define do
  factory :information_course do
    id { 1 }
    association :date_spot
    association :course
  end

  factory :other_information_course, class: InformationCourse do
    id { 2 }
    association :date_spot, factory: :other_spot # oter_spotという名前のdate_spotモデルに対してアソシエーションを通す
    association :course
  end

  factory :private_information_course, class: InformationCourse do
    id { 3 }
    association :date_spot
    association :course, factory: :private_course
  end

  factory :private_other_information_course, class: InformationCourse do
    id { 4 }
    association :date_spot, factory: :other_spot # oter_spotという名前のdate_spotモデルに対してアソシエーションを通す
    association :course, factory: :private_course
  end
end
