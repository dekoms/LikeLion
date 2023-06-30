from abc import *

class StduentManagerRepo:
    @abstractmethod
    def add_student(self, student): # 학생 추가
        pass

    @abstractmethod
    def list_student(self): # 전체 학생 조회
        pass

    @abstractmethod
    def search_student(self, name): # 학생 조회
        pass

    @abstractmethod
    def delete_student(self, name): # 학생 제거
        pass

    @abstractmethod
    def update_student(self, name, student): # 학생 수정
        pass

    @abstractmethod
    def sorted_student(self):
        pass

class StudentManageImpl(StduentManagerRepo):
    def __init__(self):
        self.students = []
    
    def add_student(self, student):
        self.students.append(student)

    def list_student(self):
        return self.students
    
    def search_student(self, name):
        for student in self.students:
            if student._Student__name == name:
                return student
        return None
    
    def delete_student(self, name):
        student = self.search_student(name)
        if student:
            self.students.remove(student)
            return True
        else:
            return False
    
    def sorted_student(self):
        self.students.sort(key=lambda s: s._Student__grade)
        return self.students


class StudentManagerService:
    def __init__(self):
        self.__student_repo = StudentManageImpl()

    def add_student(self, student): # 학생 추가
        self.__student_repo.add_student(student)

    def list_student(self): # 전체 학생 조회
        return self.__student_repo.list_student()

    def search_student(self, name): # 학생 조회
        return self.__student_repo.search_student(name)

    def delete_student(self, name): # 학생 제거
        self.__student_repo.delete_student(name)

    def update_student(self, name, student): # 학생 수정
        self.__student_repo.update_student(name, student)

    def sort_students_by_grade(self):
        return self.__student_repo.sort_students_by_grade()