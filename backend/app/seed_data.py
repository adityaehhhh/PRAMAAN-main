import random
from datetime import datetime, timedelta
from app.database import Base, engine, SessionLocal
from app.models import (
    User, Institution, Programme, Student, StudentEnrolment,
    StudentValidationResult, DuplicateCase, InstitutionSubmission,
    VerificationRequest, AuditLog, Notification
)

FIRST_NAMES = [
    "Vanshika", "Aarav", "Aditya", "Akash", "Ananya", "Anushka", "Arjun", "Bhavya", "Chetan",
    "Deepak", "Divya", "Gaurav", "Harsh", "Ishaan", "Kavya", "Manish", "Meera",
    "Neha", "Nikhil", "Pooja", "Pranav", "Priya", "Rahul", "Riya", "Rohan",
    "Sakshi", "Sanjay", "Shreya", "Siddharth", "Sneha", "Tanvi", "Varun", "Vikram",
    "Yash", "Rohit", "Aman", "Shivam", "Ritika", "Kunal", "Ayush", "Simran",
    "Vikas", "Harshit", "Mayank", "Abhishek", "Pankaj", "Mohit", "Tarun", "Aryan",
    "Kartik", "Manav", "Raghav", "Devendra", "Abhinav", "Rishabh", "Saurabh", "Nitin",
    "Vaibhav", "Tushar", "Ashish", "Prateek", "Chirag", "Alok", "Kritika", "Vandana",
    "Swati", "Rashmi", "Sunita", "Archana", "Garima", "Preeti", "Monika", "Deepali"
]

LAST_NAMES = [
    "Grover", "Sharma", "Verma", "Gupta", "Singh", "Kumar", "Mishra", "Chauhan", "Yadav",
    "Pandey", "Trivedi", "Shukla", "Saxena", "Bhatnagar", "Agarwal", "Bansal", "Chopra",
    "Malhotra", "Kapoor", "Tyagi", "Bhardwaj", "Rawat", "Tripathi", "Srivastava", "Dubey",
    "Tiwari", "Rajput", "Tomar", "Goswami", "Pathak", "Kaushik", "Dixit", "Mathur",
    "Bhati", "Agnihotri", "Rastogi", "Solanki", "Bisht", "Negi", "Nautiyal", "Choudhary"
]

STATES = [
    ("Delhi", "New Delhi"), ("Uttar Pradesh", "Lucknow"), ("Punjab", "Chandigarh"),
    ("Haryana", "Gurugram"), ("Rajasthan", "Jaipur"), ("Madhya Pradesh", "Bhopal"),
    ("Uttarakhand", "Dehradun"), ("Himachal Pradesh", "Shimla"), ("Maharashtra", "Pune"),
    ("Gujarat", "Ahmedabad")
]

CATEGORIES = ["General", "OBC-NCL", "SC", "ST", "EWS"]
SEAT_TYPES = ["Regular", "Regular", "Regular", "TFWS", "Management"]

def seed_database():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    try:
        # 1. Create Institutions
        inst_list = []
        
        # Flagship Institution
        flagship = Institution(
            aicte_id="AICTE/DEMO/10021",
            name="Bhagwan Parshuram Institute of Technology",
            state="Delhi",
            district="Rohini, New Delhi",
            institution_type="Affiliated Autonomous Engineering College",
            approval_status="AICTE Approved",
            risk_score=14,
            risk_signals="All Intake Compliant; 1 Supernumerary quota audit completed",
            address="PSP-4, Dr. K.N. Katju Marg, Sector 17, Rohini, New Delhi - 110089",
            contact_email="registrar@bpitindia.ac.in"
        )
        db.add(flagship)
        db.flush()
        inst_list.append(flagship)

        # 9 Other Institutions
        other_institutions_data = [
            ("AICTE/INST/10001", "Indian Institute of Engineering & Technology", "Maharashtra", "Pune", "Government Aided", "AICTE Approved", 12, "Normal Compliance"),
            ("AICTE/INST/10002", "Delhi National College of Engineering", "Delhi", "New Delhi", "State Government", "AICTE Approved", 8, "Zero Alerts"),
            ("AICTE/INST/10003", "Chandigarh Technical Institute", "Punjab", "Chandigarh", "Autonomous Private", "Attention Required", 68, "2 Cross-institution conflicts; 3 Capacity queries"),
            ("AICTE/INST/10004", "Uttar Pradesh Technical Academy", "Uttar Pradesh", "Lucknow", "State University Campus", "Under Review", 42, "Late submission; 4 format corrections"),
            ("AICTE/INST/10005", "Jaipur Institute of Engineering & Technology", "Rajasthan", "Jaipur", "Private University", "AICTE Approved", 15, "Normal Compliance"),
            ("AICTE/INST/10006", "Haryana College of Technology & Management", "Haryana", "Gurugram", "Autonomous Private", "AICTE Approved", 19, "Low Risk"),
            ("AICTE/INST/10007", "Uttarakhand Engineering College", "Uttarakhand", "Dehradun", "Private", "Attention Required", 55, "Unresolved APAAR validation discrepancies"),
            ("AICTE/INST/10008", "Himachal Institute of Advanced Technology", "Himachal Pradesh", "Shimla", "State Autonomous", "AICTE Approved", 5, "Fully Compliant"),
            ("AICTE/INST/10009", "National Institute of Science & Technology", "Uttar Pradesh", "Noida", "Private", "AICTE Approved", 18, "Normal Compliance")
        ]

        for aicte_id, name, state, dist, itype, status, risk, signals in other_institutions_data:
            inst = Institution(
                aicte_id=aicte_id,
                name=name,
                state=state,
                district=dist,
                institution_type=itype,
                approval_status=status,
                risk_score=risk,
                risk_signals=signals,
                address=f"Higher Education Campus, {dist}, {state}",
                contact_email=f"compliance@{aicte_id.replace('/', '_').lower()}.org"
            )
            db.add(inst)
            db.flush()
            inst_list.append(inst)

        # 2. Create Users
        users = [
            User(
                username="AICTE_ADMIN",
                password_hash="admin123",
                role="AICTE_ADMIN",
                institution_id=None,
                full_name="Dr. Vanshika Grover",
                designation="Director (Approval & Governance), AICTE New Delhi",
                email="director.governance@aicte-india.gov.in",
                phone="+91-11-2958-1000"
            ),
            User(
                username="INST_10021",
                password_hash="demo123",
                role="INSTITUTION",
                institution_id=flagship.id,
                full_name="Prof. Ajay Kumar Sharma",
                designation="Dean (Academic Registrations), Bhagwan Parshuram Institute of Technology",
                email="dean.academics@bpitindia.ac.in",
                phone="+91-11-2757-1021"
            ),
            User(
                username="INST_10001",
                password_hash="demo123",
                role="INSTITUTION",
                institution_id=inst_list[1].id,
                full_name="Prof. Mahendra Pratap Singh",
                designation="Registrar, IIET Pune",
                email="registrar@iietpune.ac.in",
                phone="+91-20-2569-1001"
            ),
            User(
                username="VERIFIER_004",
                password_hash="verify123",
                role="VERIFIER",
                institution_id=None,
                full_name="Alok Srivastava",
                designation="Lead Analyst, Background Verification Cell (TCS Ltd)",
                email="a.srivastava@tcs-bgv.com",
                phone="+91-11-6778-9004"
            )
        ]
        db.add_all(users)
        db.flush()

        # 3. Create Programmes for institutions
        programmes_map = {}
        for inst in inst_list:
            if inst.aicte_id == "AICTE/DEMO/10021":
                p_configs = [
                    ("B.Tech Computer Science and Engineering", "Undergraduate", 120, 10, 118, 4, "Compliant"),
                    ("B.Tech Information Technology", "Undergraduate", 60, 5, 58, 2, "Compliant"),
                    ("Master of Business Administration (MBA)", "Postgraduate", 60, 0, 60, 0, "Compliant"),
                    ("Master of Computer Applications (MCA)", "Postgraduate", 60, 5, 54, 1, "Compliant")
                ]
            elif inst.aicte_id == "AICTE/INST/10003":  # Bangalore (Attention required - capacity exceeded)
                p_configs = [
                    ("B.Tech Artificial Intelligence and Data Science", "Undergraduate", 60, 5, 68, 6, "Review Required"),
                    ("B.Tech Electronics & Communication", "Undergraduate", 120, 10, 119, 5, "Compliant")
                ]
            else:
                p_configs = [
                    ("B.Tech Computer Science and Engineering", "Undergraduate", 120, 10, 115, 3, "Compliant"),
                    ("B.Tech Mechanical Engineering", "Undergraduate", 60, 5, 52, 1, "Compliant")
                ]

            programmes_map[inst.id] = []
            for pname, level, approved, super_cap, cur_reg, cur_sup, pstatus in p_configs:
                prog = Programme(
                    institution_id=inst.id,
                    programme_name=pname,
                    degree_level=level,
                    approved_intake=approved,
                    academic_year="2026-27",
                    supernumerary_cap=super_cap,
                    current_enrolment=cur_reg,
                    current_supernumerary=cur_sup,
                    status=pstatus
                )
                db.add(prog)
                db.flush()
                programmes_map[inst.id].append(prog)

        # 4. Generate Students & Enrolments
        # Seed 320 synthetic realistic student records
        apaar_start = 883491000000
        student_records = []
        
        # Specific Demo Cases:
        # Case 1: Flagship Verified Student
        std_case1 = Student(
            apaar_id="883491021001",
            full_name="Vanshika Grover",
            dob="2005-06-14",
            gender="Female",
            category="General",
            seat_type="Regular",
            is_supernumerary=False,
            student_status="Active",
            verification_status="VERIFIED"
        )
        db.add(std_case1)
        db.flush()
        db.add(StudentEnrolment(
            student_id=std_case1.id,
            institution_id=flagship.id,
            programme_id=programmes_map[flagship.id][0].id,
            enrollment_no="AICTE/BPIT/2026/CSE/001",
            academic_year="2026-27",
            admission_session="Regular Autumn 2026",
            admission_date="2026-07-12",
            status="Active"
        ))

        # Case 4: Cross-institution concurrent enrolment ("Rahul Kumar")
        std_case4 = Student(
            apaar_id="883491021234",
            full_name="Rahul Kumar",
            dob="2005-09-20",
            gender="Male",
            category="OBC-NCL",
            seat_type="Regular",
            is_supernumerary=False,
            student_status="Active",
            verification_status="CONFLICT"
        )
        db.add(std_case4)
        db.flush()
        # Enrolment 1 at Bhagwan Parshuram Institute of Technology
        db.add(StudentEnrolment(
            student_id=std_case4.id,
            institution_id=flagship.id,
            programme_id=programmes_map[flagship.id][0].id,
            enrollment_no="AICTE/BPIT/2026/CSE/084",
            academic_year="2026-27",
            admission_session="Regular Autumn 2026",
            admission_date="2026-07-18",
            status="Active"
        ))
        # Enrolment 2 at IIET Pune (Same APAAR active concurrently!)
        db.add(StudentEnrolment(
            student_id=std_case4.id,
            institution_id=inst_list[1].id,
            programme_id=programmes_map[inst_list[1].id][0].id,
            enrollment_no="IIET/2026/UG/402",
            academic_year="2026-27",
            admission_session="Regular Autumn 2026",
            admission_date="2026-07-22",
            status="Active"
        ))

        # Register in DuplicateCase table
        dup_case = DuplicateCase(
            apaar_id="883491021234",
            student_name="Rahul Kumar",
            primary_institution_id=flagship.id,
            primary_institution_name=flagship.name,
            primary_programme="B.Tech Computer Science and Engineering",
            primary_enrolment_no="AICTE/BPIT/2026/CSE/084",
            secondary_institution_id=inst_list[1].id,
            secondary_institution_name=inst_list[1].name,
            secondary_programme="B.Tech Computer Science and Engineering",
            secondary_enrolment_no="IIET/2026/UG/402",
            academic_year="2026-27",
            conflict_type="POTENTIAL CONCURRENT ENROLMENT",
            flag_reasons="Identical 12-digit APAAR registered in two active state institutions with overlapping admission schedules.",
            status="OPEN"
        )
        db.add(dup_case)

        # Case 6: Duplicate transfer candidate 2 ("Pooja Malhotra")
        std_case4b = Student(
            apaar_id="883491025588",
            full_name="Pooja Malhotra",
            dob="2006-01-10",
            gender="Female",
            category="General",
            seat_type="Regular",
            is_supernumerary=False,
            student_status="Active",
            verification_status="CONFLICT"
        )
        db.add(std_case4b)
        db.flush()
        db.add(StudentEnrolment(
            student_id=std_case4b.id,
            institution_id=inst_list[3].id,  # Chandigarh
            programme_id=programmes_map[inst_list[3].id][0].id,
            enrollment_no="CTI/2026/AIDS/044",
            academic_year="2026-27",
            admission_session="Regular Autumn 2026",
            admission_date="2026-07-25",
            status="Active"
        ))
        db.add(StudentEnrolment(
            student_id=std_case4b.id,
            institution_id=inst_list[6].id,  # Haryana
            programme_id=programmes_map[inst_list[6].id][0].id,
            enrollment_no="HCTM/2026/UG/109",
            academic_year="2026-27",
            admission_session="Regular Autumn 2026",
            admission_date="2026-08-01",
            status="Active"
        ))
        db.add(DuplicateCase(
            apaar_id="883491025588",
            student_name="Pooja Malhotra",
            primary_institution_id=inst_list[3].id,
            primary_institution_name=inst_list[3].name,
            primary_programme="B.Tech Artificial Intelligence and Data Science",
            primary_enrolment_no="CTI/2026/AIDS/044",
            secondary_institution_id=inst_list[6].id,
            secondary_institution_name=inst_list[6].name,
            secondary_programme="B.Tech Computer Science and Engineering",
            secondary_enrolment_no="HCTM/2026/UG/109",
            academic_year="2026-27",
            conflict_type="POTENTIAL CONCURRENT ENROLMENT",
            flag_reasons="Simultaneous active student records across Chandigarh & Haryana campuses without inter-state transfer clearance certificate.",
            status="OPEN"
        ))

        # Generate bulk realistic synthetic students for each institution
        counter = 100
        for inst_idx, inst in enumerate(inst_list):
            for prog in programmes_map[inst.id]:
                count_to_create = min(25, prog.current_enrolment)
                for i in range(count_to_create):
                    counter += 1
                    fn = random.choice(FIRST_NAMES)
                    ln = random.choice(LAST_NAMES)
                    s_apaar = str(apaar_start + counter)
                    s_cat = random.choice(CATEGORIES)
                    s_seat = random.choice(SEAT_TYPES)
                    is_super = (s_seat == "TFWS")
                    
                    s_dob = f"{random.randint(2003, 2007)}-{random.randint(1,12):02d}-{random.randint(1,28):02d}"
                    gender = random.choice(["Male", "Female"])

                    st = Student(
                        apaar_id=s_apaar,
                        full_name=f"{fn} {ln}",
                        dob=s_dob,
                        gender=gender,
                        category=s_cat,
                        seat_type=s_seat,
                        is_supernumerary=is_super,
                        supernumerary_type="TFWS" if is_super else None,
                        student_status="Active",
                        verification_status="VERIFIED"
                    )
                    db.add(st)
                    db.flush()

                    db.add(StudentEnrolment(
                        student_id=st.id,
                        institution_id=inst.id,
                        programme_id=prog.id,
                        enrollment_no=f"{inst.aicte_id.split('/')[-1]}/{prog.academic_year[:4]}/{prog.programme_name[:3].upper()}/{counter:04d}",
                        academic_year="2026-27",
                        admission_session="Regular Autumn 2026",
                        admission_date=f"2026-07-{random.randint(10, 28):02d}",
                        status="Active"
                    ))

        # 5. Create Seed Validation Issues in Validation Centre
        # Issue 1: Invalid APAAR format
        v1 = StudentValidationResult(
            student_id=None,
            student_name="Neha Rajput",
            apaar_id="8821949102",  # 10 digits instead of 12
            institution_id=inst_list[4].id,
            institution_name=inst_list[4].name,
            rule_code="FORMAT_APAAR",
            severity="ERROR",
            message="Invalid APAAR ID format '8821949102'. Expected exactly 12 numeric digits.",
            status="OPEN"
        )
        # Issue 2: Cross-institution conflict for Rahul Kumar
        v2 = StudentValidationResult(
            student_id=std_case4.id,
            student_name=std_case4.full_name,
            apaar_id=std_case4.apaar_id,
            institution_id=flagship.id,
            institution_name=flagship.name,
            rule_code="CROSS_INSTITUTION",
            severity="WARNING",
            message="Potential concurrent enrolment detected across active institutions: Indian Institute of Engineering & Technology (Pune).",
            status="OPEN"
        )
        # Issue 3: Capacity anomaly at Chandigarh
        v3 = StudentValidationResult(
            student_id=None,
            student_name="N/A (Batch Quota)",
            apaar_id="N/A",
            institution_id=inst_list[3].id,
            institution_name=inst_list[3].name,
            rule_code="CAPACITY_BREACH",
            severity="ALERT",
            message="Programme enrolment exceeds approved capacity. Approved Intake: 60, Regular Enrolment: 68 (+8 variance).",
            status="OPEN"
        )
        # Issue 4: Student details inconsistent
        v4 = StudentValidationResult(
            student_id=None,
            student_name="Siddharth K. Rawat",
            apaar_id="883491024410",
            institution_id=inst_list[8].id,
            institution_name=inst_list[8].name,
            rule_code="IDENTITY_INCONSISTENCY",
            severity="WARNING",
            message="Submitted student name 'Siddharth K. Rawat' inconsistent with National Academic Depository registered name 'Siddharth Kumar Rawat'.",
            status="UNDER_REVIEW"
        )
        # Issue 5: Duplicate APAAR in past upload (Resolved)
        v5 = StudentValidationResult(
            student_id=None,
            student_name="Kartik Sharma",
            apaar_id="883491023190",
            institution_id=flagship.id,
            institution_name=flagship.name,
            rule_code="DUPLICATE_BATCH",
            severity="ERROR",
            message="Duplicate APAAR ID within previous batch submission. Corrected by institution registrar.",
            status="RESOLVED",
            resolution_notes="Registrar updated row 42 with verified unique student APAAR ID.",
            resolved_by="INST_10021",
            resolved_at=datetime.utcnow() - timedelta(days=2)
        )
        db.add_all([v1, v2, v3, v4, v5])

        # 6. Seed Institution Submissions
        s1 = InstitutionSubmission(
            institution_id=flagship.id,
            programme_id=programmes_map[flagship.id][0].id,
            academic_year="2026-27",
            batch_name="B.Tech CSE 2026 Regular Enrolment Batch-01",
            file_name="bpit_cse_batch_01.csv",
            total_records=118,
            valid_count=115,
            warning_count=2,
            error_count=1,
            status="PROCESSED",
            submitted_by="INST_10021",
            created_at=datetime.utcnow() - timedelta(days=5)
        )
        s2 = InstitutionSubmission(
            institution_id=flagship.id,
            programme_id=programmes_map[flagship.id][1].id,
            academic_year="2026-27",
            batch_name="B.Tech IT 2026 Regular Enrolment Batch-01",
            file_name="bpit_it_batch_01.csv",
            total_records=58,
            valid_count=58,
            warning_count=0,
            error_count=0,
            status="PROCESSED",
            submitted_by="INST_10021",
            created_at=datetime.utcnow() - timedelta(days=3)
        )
        db.add_all([s1, s2])

        # 7. Seed Sample Verification Requests & Certificates
        vr1 = VerificationRequest(
            reference_no="AICTE-VER-2026-000184",
            apaar_id="883491021001",
            student_name="Vanshika Grover",
            requester_org="Tata Consultancy Services Ltd (Talent Acquisition Cell)",
            verification_purpose="Employment Verification (Campus Hire Batch 2026)",
            consent_recorded=True,
            status="VERIFIED",
            result_summary="Student Academic Identity: Verified. Enrolled in B.Tech Computer Science and Engineering at Bhagwan Parshuram Institute of Technology under AICTE regulatory approval.",
            institution_name="Bhagwan Parshuram Institute of Technology",
            programme_name="B.Tech Computer Science and Engineering",
            admission_year="2026",
            created_at=datetime.utcnow() - timedelta(days=1)
        )
        vr2 = VerificationRequest(
            reference_no="AICTE-VER-2026-000185",
            apaar_id="883491021234",
            student_name="Rahul Kumar",
            requester_org="Infosys BGV Team",
            verification_purpose="Pre-employment Background Verification",
            consent_recorded=True,
            status="UNDER_INVESTIGATION",
            result_summary="Cross-institution active registration flag exists under regulatory review. Verification pending AICTE inquiry resolution.",
            institution_name="Bhagwan Parshuram Institute of Technology",
            programme_name="B.Tech Computer Science and Engineering",
            admission_year="2026",
            created_at=datetime.utcnow() - timedelta(hours=6)
        )
        db.add_all([vr1, vr2])

        # 8. Seed Audit Logs
        now = datetime.utcnow()
        audit_records = [
            AuditLog(
                timestamp=now - timedelta(days=7),
                user_id="AICTE_ADMIN",
                role="AICTE_ADMIN",
                action="System Initialisation",
                entity_type="System",
                entity_id="SYS/2026-27",
                previous_value=None,
                new_value="Academic Year 2026-27 Enrolment Portal Opened",
                details="AICTE National Portal opened for APAAR-based student intake submission."
            ),
            AuditLog(
                timestamp=now - timedelta(days=5),
                user_id="INST_10021",
                role="INSTITUTION",
                action="Uploaded student dataset",
                entity_type="Submission",
                entity_id="SUB/10021/01",
                previous_value="0 records",
                new_value="118 records received",
                details="Bhagwan Parshuram Institute of Technology uploaded B.Tech CSE Batch-01."
            ),
            AuditLog(
                timestamp=now - timedelta(days=3),
                user_id="AICTE_ADMIN",
                role="AICTE_ADMIN",
                action="Intake Compliance Review Triggered",
                entity_type="Programme",
                entity_id="PROG/CTI/01",
                previous_value="Approved Intake: 60",
                new_value="Enrolment Reported: 68",
                details="Flagged Chandigarh Technical Institute for potential capacity breach."
            ),
            AuditLog(
                timestamp=now - timedelta(days=2),
                user_id="INST_10021",
                role="INSTITUTION",
                action="Updated student record",
                entity_type="Student",
                entity_id="883491023190",
                previous_value="Duplicate APAAR in batch",
                new_value="Unique Validated APAAR",
                details="Resolved duplicate APAAR issue in row 42."
            ),
            AuditLog(
                timestamp=now - timedelta(days=1),
                user_id="VERIFIER_004",
                role="VERIFIER",
                action="Created verification request",
                entity_type="Verification",
                entity_id="AICTE-VER-2026-000184",
                previous_value=None,
                new_value="Status: VERIFIED",
                details="Authorized employer verification completed for APAAR 883491021001 (Vanshika Grover)."
            )
        ]
        db.add_all(audit_records)

        # 9. Seed Notifications
        notifications = [
            Notification(
                user_role="AICTE_ADMIN",
                title="Cross-Institution Conflict Detected",
                message="Student Rahul Kumar (APAAR 883491021234) has concurrent active enrolments in Bhagwan Parshuram Institute of Technology and IIET Pune.",
                severity="warning",
                link_url="/duplicates"
            ),
            Notification(
                user_role="AICTE_ADMIN",
                title="Approved Intake Threshold Alert",
                message="Chandigarh Technical Institute reported 68 admissions against approved intake of 60 in AI & Data Science.",
                severity="error",
                link_url="/intake-compliance"
            ),
            Notification(
                user_role="INSTITUTION",
                institution_id=flagship.id,
                title="Student Data Submission Completed",
                message="Batch 'B.Tech CSE 2026 Regular Enrolment Batch-01' processed: 115 Valid, 2 Warnings, 1 Resolved.",
                severity="info",
                link_url="/institution/dashboard"
            ),
            Notification(
                user_role="INSTITUTION",
                institution_id=flagship.id,
                title="Validation Correction Request from AICTE",
                message="Cross-institution enquiry pending for student Rahul Kumar. Clarification requested from institution.",
                severity="warning",
                link_url="/validation"
            )
        ]
        db.add_all(notifications)

        db.commit()
        print("Database seeded successfully with regulatory Indian AICTE higher education test data.")
    except Exception as e:
        db.rollback()
        print("Error seeding database:", e)
        raise e
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()
