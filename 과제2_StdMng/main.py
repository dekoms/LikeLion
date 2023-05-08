from ast import main
import StudentManagerService

if __name__ == '__main__':
    manager = StudentManagerService()
    main(manager)

while True:
    print("========================\n")
    print("1. 학생 추가\n2. 학생 출력\n3. 전체 학생 조회\n4. 학생 조회\n5. 학생 제거\n6. 학생 수정\n7. 종료\n")
    print("========================\n")

    input = int(input())
    if input == 1:
        StudentManagerService.add_student
    if input == 2:
        StudentManagerService.add_student
    if input == 3:
        StudentManagerService.add_student
    if input == 4:
        StudentManagerService.add_student
    if input == 5:
        StudentManagerService.add_student
    if input == 6:
        StudentManagerService.add_student
    if input == 7:
        exit()