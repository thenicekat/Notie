class SubjectModel {
  int? id;
  late String subject;
  late String sem;
  late int credits;
  late int midsemGrade;
  late int finalGrade;

  SubjectModel(
      {this.id,
      required this.subject,
      required this.sem,
      required this.credits,
      required this.midsemGrade,
      required this.finalGrade});

  SubjectModel.fromMap(Map<String, dynamic> item) {
    id = item["id"];
    subject = item["subject"];
    sem = item["sem"];
    credits = item["credits"];
    midsemGrade = item["midsemGrade"];
    finalGrade = item["finalGrade"];
  }

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'subject': subject,
      'sem': sem,
      'credits': credits,
      'midsemGrade': midsemGrade,
      'finalGrade': finalGrade,
    };
  }
}
