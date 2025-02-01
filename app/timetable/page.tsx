'use client'
import { Card, Input, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Accordion, AccordionItem } from "@nextui-org/react";
import { CAMPUS } from "@/config/campus";
import { GRADE } from "@/config/grade";
import { LectureApi } from "../api/lecture.api";
import { useEffect, useState, useRef } from "react";
import { hasDuplicates, splitTime } from "@/util/util";
import { Lecture } from "@/components/lecture.component";
import { LargeLecture } from "@/components/large-lecture.component";
import { AccountApi } from "../api/account.api";
import { useRecoilState } from "recoil";
import { authState } from "@/states/auth";
import { START_TIME } from "@/config/start-time";
import html2canvas from 'html2canvas';

export default function Home() {
  const timetableRef = useRef(null);
  const [lectures, setLectures] = useState([]);
  const [query, setQuery] = useState("");
  const [campus, setCampus] = useState("");
  const [grade, setGrade] = useState("");
  const [professor, setProfessor] = useState("");
  const [name, setName] = useState("");
  const [timezone, setTimezone] = useState("");
  const [major, setMajor] = useState("");
  const [lectureNumber, setLectureNumber] = useState("");
  const [width, setWidth] = useState(1000);
  const [isDownloading, setIsDownloading] = useState(false);

  const [campusInSelfForm, setCampusInSelfForm] = useState("");
  const [gradeInSelfForm, setGradeInSelfForm] = useState("");
  const [professorInSelfForm, setProfessorInSelfForm] = useState("");
  const [nameInSelfForm, setNameInSelfForm] = useState("");
  const [categoryInSelfForm] = useState("");
  const [majorInSelfForm, setMajorInSelfForm] = useState("");
  const [lectureNumberInSelfForm, setLectureNumberInSelfForm] = useState("");
  const [creditInSelfForm, setCreditInSelfForm] = useState("");
  const [groupInSelfForm, setGroupInSelfForm] = useState("");
  const [roomInSelfForm, setRoomInSelfForm] = useState("");
  const [timeInSelfForm, setTimeInSelfForm] = useState("");

  const [auth] = useRecoilState(authState);

  const [timeTable, setTimeTable] = useState({
    '월': [],
    '화': [],
    '수': [],
    '목': [],
    '금': [],
    lectures: []
  });

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  }

  const loadTimetableFromLocalStorage = () => {
    const savedTimeTable = localStorage.getItem('timeTable');
    if (savedTimeTable != null) {
      setTimeTable(JSON.parse(savedTimeTable));
    }
  }

  useEffect(() => {
    setWidth(window.innerWidth);
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, []);

  const loadTimetable = async () => {
    if (auth.isLoggedIn) {
      const account = await AccountApi.getAccount(auth.token);
      if (account.savedTimetable == '') {
        const savedTimeTable = localStorage.getItem('timeTable');
        if (savedTimeTable != null) {
          await AccountApi.uploadTimetable(auth.token, savedTimeTable);
          loadTimetableFromLocalStorage();
          return null;
        }
      }
      return account.savedTimetable;
    } else {
      loadTimetableFromLocalStorage();
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const timetableData = await loadTimetable();
      if (timetableData !== null) {
        setTimeTable(JSON.parse(timetableData));
      }
    };

    fetchData();
  }, []);

  const onSearchButtonClicked = async () => {
    const lecturesFromApi = await LectureApi.loadLectures({
      campusName: campus,
      grade,
      professor,
      name,
      major,
      group: timezone,
      query: query.replaceAll(' ', ''),
      lectureNumber
    });
    setLectures(lecturesFromApi);
  }

  const onAddLectureButtonClicked = async (lecture) => {
    let lectures;
    if (timeTable.lectures.some(item => item.id == lecture.id)) {
      lectures = timeTable.lectures.filter(item => item.id != lecture.id);
    } else {
      lectures = timeTable.lectures.concat(lecture);
    }
    const newTimeTable = {
      '월': [],
      '화': [],
      '수': [],
      '목': [],
      '금': [],
    };
    for (const item of lectures) {
      const newData = splitTime(item.time);
      for (const day in newData) {
        newTimeTable[day] = newTimeTable[day].concat(newData[day].map(time => ({ time, lecture: item })));
        if (hasDuplicates(newTimeTable[day].map(item => item.time))) {
          alert("시간이 겹치는 강의가 존재합니다.");
          return;
        }
      }
    }
    setTimeTable({
      ...newTimeTable,
      lectures,
    });
    if (auth.isLoggedIn) {
      await AccountApi.uploadTimetable(auth.token, JSON.stringify({
        ...newTimeTable,
        lectures,
      }));
    } else {
      localStorage.setItem('timeTable', JSON.stringify({
        ...newTimeTable,
        lectures,
      }));
    }
  }

  const onAddLectureSelfButtonClicked = async () => {
    if (nameInSelfForm == "") {
      alert("강의명을 입력해주세요.");
      return;
    }
    const lecture = {
      id: new Date().getTime(),
      professor: professorInSelfForm,
      name: nameInSelfForm,
      campusName: campusInSelfForm,
      lectureNumber: lectureNumberInSelfForm,
      grade: gradeInSelfForm,
      room: roomInSelfForm,
      time: timeInSelfForm,
      year: 2024,
      semester: 1,
      credit: creditInSelfForm,
      category: categoryInSelfForm,
      group: groupInSelfForm,
      major: majorInSelfForm
    }
    let lectures;
    if (timeTable.lectures.some(item => item.id == lecture.id)) {
      lectures = timeTable.lectures.filter(item => item.id != lecture.id);
    } else {
      lectures = timeTable.lectures.concat(lecture);
    }
    const newTimeTable = {
      '월': [],
      '화': [],
      '수': [],
      '목': [],
      '금': [],
    };
    for (const item of lectures) {
      const newData = splitTime(item.time);
      for (const day in newData) {
        newTimeTable[day] = newTimeTable[day].concat(newData[day].map(time => ({ time, lecture: item })));
        if (hasDuplicates(newTimeTable[day].map(item => item.time))) {
          alert("시간이 겹치는 강의가 존재합니다.");
          return;
        }
      }
    }
    setTimeTable({
      ...newTimeTable,
      lectures,
    });
    localStorage.setItem('timeTable', JSON.stringify({
      ...newTimeTable,
      lectures,
    }));
  }

  const onKeyDown = (e) => {
    if (e.key == 'Enter') {
      onSearchButtonClicked();
    }
  }

  const onKeyDownInSelfForm = (e) => {
    if (e.key == 'Enter') {
      onAddLectureSelfButtonClicked();
    }
  }

  const downloadTimetable = async () => {
    if (!timetableRef.current || isDownloading) return;
    
    try {
      setIsDownloading(true);
      
      const clone = timetableRef.current.cloneNode(true);

      const cells = clone.querySelectorAll('.grid > div');
      cells.forEach(cell => {
        cell.style.display = 'flex';
        cell.style.alignItems = 'center';
        cell.style.justifyContent = 'center';
        cell.style.height = '60px';
        cell.style.margin = '0';
        cell.style.padding = '0';
        cell.style.boxSizing = 'border-box';
        cell.style.position = 'relative';
        
        const textNode = cell.firstChild;
        if (textNode && textNode.nodeType === Node.TEXT_NODE) {
          const span = document.createElement('span');
          span.textContent = textNode.textContent;
          span.style.position = 'absolute';
          span.style.top = '40%';
          span.style.left = '50%';
          span.style.transform = 'translate(-50%, -50%)';
          span.style.width = '100%';
          span.style.textAlign = 'center';
          span.style.fontSize = '10px';
          cell.replaceChild(span, textNode);
        }
      });

      const container = document.createElement('div');
      container.style.position = 'fixed';
      container.style.left = '-9999px';
      container.style.top = '-9999px';
      
      const aspectRatio = 1.9;
      const mobileWidth = Math.min(window.innerWidth, 400);
      const mobileHeight = mobileWidth * aspectRatio;
      
      container.style.width = `${mobileWidth}px`;
      container.style.height = `${mobileHeight}px`;
      container.style.padding = '8px';
      container.style.backgroundColor = '#ffffff';
      
      const timeTableContainer = document.createElement('div');
      timeTableContainer.style.width = '100%';
      timeTableContainer.style.height = 'calc(100% + 40px)';
      timeTableContainer.appendChild(clone);
      container.appendChild(timeTableContainer);

      const watermark = document.createElement('div');
      watermark.style.position = 'absolute';
      watermark.style.bottom = '8px';
      watermark.style.left = '0';
      watermark.style.width = '100%';
      watermark.style.textAlign = 'center';
      watermark.style.padding = '8px 0';
      watermark.style.borderTop = '1px solid #e9ecef';
      watermark.style.color = '#6c757d';
      watermark.style.fontSize = '12px';
      watermark.textContent = '[경기타임 시간표] https://kyonggiti.me';
      container.appendChild(watermark);

      document.body.appendChild(container);

      const canvas = await html2canvas(container, {
        scale: 2,
        backgroundColor: '#ffffff',
        useCORS: true,
        allowTaint: true,
        width: mobileWidth,
        height: mobileHeight,
        onclone: (doc) => {
          const element = doc.querySelector('[ref="timetableRef"]');
          if (element) {
            element.style.width = '100%';
            element.style.margin = '0';
          }
        }
      });

      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = '경기타임_시간표.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        document.body.removeChild(container);
        setIsDownloading(false);
      }, 'image/png', 1.0);

    } catch (error) {
      console.error('Failed to download timetable:', error);
      alert('시간표 다운로드에 실패했습니다.');
      setIsDownloading(false);
    }
  };

  const shouldShowLectureName = (day, time) => {
    const lectures = timeTable[day];
    const currentLecture = lectures.find(l => l.time == time);
    if (!currentLecture) return false;
    
    const prevTime = time - 1;
    const prevLecture = lectures.find(l => l.time == prevTime);
    
    return !prevLecture || prevLecture.lecture.id !== currentLecture.lecture.id;
  };

  return (
    <>
      <div className="max-w-[1000px] mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold">시간표</h1>
          <Button
            color="primary"
            variant="flat"
            size="sm"
            onClick={downloadTimetable}
            isDisabled={isDownloading}
          >
            {isDownloading ? "이미지 다운로드 중..." : "이미지로 다운로드하기"}
          </Button>
        </div>
        
        <div className="w-full" ref={timetableRef}>
          <div className="grid grid-cols-11 text-center">
            <span className="text-sm text-center p-2 bg-[#0070F0] text-white border shadow-xl rounded-xl"></span>
            <span className="text-sm text-center p-2 col-span-2 bg-[#0070F0] text-white border shadow-xl rounded-xl">월</span>
            <span className="text-sm text-center p-2 col-span-2 bg-[#0070F0] text-white border shadow-xl rounded-xl">화</span>
            <span className="text-sm text-center p-2 col-span-2 bg-[#0070F0] text-white border shadow-xl rounded-xl">수</span>
            <span className="text-sm text-center p-2 col-span-2 bg-[#0070F0] text-white border shadow-xl rounded-xl">목</span>
            <span className="text-sm text-center p-2 col-span-2 bg-[#0070F0] text-white border shadow-xl rounded-xl">금</span>
          </div>
          {timeTable.lectures &&
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
              <div className="grid grid-cols-11 text-center" key={item}>
                <div className="text-sm text-center p-1 sm:p-2 bg-[#0070F0] text-white border border-gray-300 shadow-2xl rounded-xl">
                  {START_TIME[item]}
                </div>
                {['월', '화', '수', '목', '금'].map(day => {
                  const hasLecture = timeTable[day].some(time => time.time == item);
                  const shouldShowName = shouldShowLectureName(day, item);
                  
                  return hasLecture ? (
                    <div key={day} className="text-sm text-center p-1 sm:p-2 col-span-2 bg-[#90B8E7] text-white border border-gray-300 shadow-2xl rounded-xl">
                      {shouldShowName ? timeTable[day].find(time => time.time == item).lecture.name : ''}
                    </div>
                  ) : (
                    <div key={day} className="text-sm text-center col-span-2 p-2 bg-white border border-gray-300 shadow-2xl rounded-xl"></div>
                  );
                })}
              </div>
            ))}
        </div>

        {timeTable.lectures && timeTable.lectures.filter(lecture => lecture.time == "").length > 0 && (
          <>
            <h1 className="text-center text-sm mt-2 font-bold">시간표에 배치되지 않은 강의</h1>
            {timeTable.lectures
              .filter(lecture => lecture.time == "")
              .map(lecture => (
                <h2 className="text-xs text-center" key={lecture.id}>
                  {lecture.name}
                </h2>
              ))}
          </>
        )}

        <Card shadow="none" className="flex-col items-center justify-center p-4 mt-2 gap-4 w-full">
          <h1 className="text-center text-md font-bold">추가한 강의</h1>
          {timeTable.lectures &&
            timeTable.lectures.map(lecture => (
              width <= 800 ? (
                <LargeLecture
                  lecture={lecture}
                  onClick={() => onAddLectureButtonClicked(lecture)}
                  buttonText={timeTable.lectures.some(item => item.id == lecture.id) ? "제거" : "추가"}
                  key={lecture.id}
                  initMaximized={false}
                />
              ) : (
                <Lecture
                  lecture={lecture}
                  onClick={() => onAddLectureButtonClicked(lecture)}
                  buttonText={timeTable.lectures.some(item => item.id == lecture.id) ? "제거" : "추가"}
                  key={lecture.id}
                />
              )
            ))}
        </Card>

        <Card className="flex-col flex items-center justify-center mt-2 p-4 w-full">
          <h1 className="text-center text-md font-bold">강의 검색 및 추가</h1>
          <div className="flex flex-wrap content-center w-full" onKeyDown={onKeyDown}>
            <Input
              type="title"
              placeholder="검색어 입력 (강의명, 교수명 등)"
              className="m-2 w-full"
              variant="bordered"
              onChange={(e) => setQuery(e.target.value)}
            />
            <Accordion>
              <AccordionItem aria-label="상세 조건" title="상세 조건">
                <Dropdown>
                  <DropdownTrigger className="m-2">
                    <Button variant="bordered">
                      {campus + "캠퍼스" || "캠퍼스 선택"}
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    items={CAMPUS}
                    selectionMode="single"
                    onSelectionChange={keys => setCampus(Array.from(keys).join(", ").replaceAll("_", " "))}
                  >
                    {(item) => (
                      <DropdownItem key={item.key}>{item.label}</DropdownItem>
                    )}
                  </DropdownMenu>
                </Dropdown>
                <Dropdown>
                  <DropdownTrigger className="m-2">
                    <Button variant="bordered">
                      {grade + "학년" || "학년 선택"}
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    items={GRADE}
                    selectionMode="single"
                    onSelectionChange={keys => setGrade(Array.from(keys).join(", ").replaceAll("_", " "))}
                  >
                    {(item) => (
                      <DropdownItem key={item.key}>{item.label}</DropdownItem>
                    )}
                  </DropdownMenu>
                </Dropdown>
                <Input type="title" placeholder="과목명" className="m-2 w-30" variant="bordered" onChange={(e) => setName(e.target.value)} />
                <Input type="title" placeholder="교수명" className="m-2 w-30" variant="bordered" onChange={(e) => setProfessor(e.target.value)} />
                <Input type="title" placeholder="학과명" className="m-2 w-30" variant="bordered" onChange={(e) => setMajor(e.target.value)} />
                <Input type="title" placeholder="시간대구분명" className="m-2 w-30" variant="bordered" onChange={(e) => setTimezone(e.target.value)} />
                <Input type="number" placeholder="강의번호" className="m-2 w-30" variant="bordered" onChange={(e) => setLectureNumber(e.target.value)} />
              </AccordionItem>
            </Accordion>
          </div>
          <Button variant="shadow" color="primary" className="m-2 w-full" onClick={onSearchButtonClicked}>
            검색
          </Button>
        </Card>

        <Card shadow="none" className="flex-col items-center justify-center p-4 mt-2 gap-4 w-full">
          {lectures.map(lecture => (
            width <= 800 ? (
              <LargeLecture
                lecture={lecture}
                onClick={() => onAddLectureButtonClicked(lecture)}
                buttonText={timeTable.lectures.some(item => item.id == lecture.id) ? "제거" : "추가"}
                key={lecture.id}
                initMaximized={true}
              />
            ) : (
              <Lecture
                lecture={lecture}
                onClick={() => onAddLectureButtonClicked(lecture)}
                buttonText={timeTable.lectures.some(item => item.id == lecture.id) ? "제거" : "추가"}
                key={lecture.id}
              />
            )
          ))}
        </Card>

        <Card className="flex-col flex items-center justify-center mt-20 p-4 w-full">
          <div className="flex flex-wrap content-center w-full" onKeyDown={onKeyDownInSelfForm}>
            <Accordion>
              <AccordionItem aria-label="강의 직접 입력해서 추가" title="강의 직접 입력해서 추가">
                <Dropdown>
                  <DropdownTrigger className="m-2">
                    <Button variant="bordered">
                      {campusInSelfForm + "캠퍼스" || "캠퍼스 선택"}
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    items={CAMPUS}
                    selectionMode="single"
                    onSelectionChange={keys => setCampusInSelfForm(Array.from(keys).join(", ").replaceAll("_", " "))}
                  >
                    {(item) => (
                      <DropdownItem key={item.key}>{item.label}</DropdownItem>
                    )}
                  </DropdownMenu>
                </Dropdown>
                <Dropdown>
                  <DropdownTrigger className="m-2">
                    <Button variant="bordered">
                      {gradeInSelfForm + "학년" || "학년 선택"}
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    items={GRADE}
                    selectionMode="single"
                    onSelectionChange={keys => setGradeInSelfForm(Array.from(keys).join(", ").replaceAll("_", " "))}
                  >
                    {(item) => (
                      <DropdownItem key={item.key}>{item.label}</DropdownItem>
                    )}
                  </DropdownMenu>
                </Dropdown>
                <Input type="title" placeholder="강의명" className="m-2 w-30" variant="bordered" onChange={(e) => setNameInSelfForm(e.target.value)} />
                <Input type="title" placeholder="시간대 ex) 금 1 2 3" className="m-2 w-30" variant="bordered" onChange={(e) => setTimeInSelfForm(e.target.value)} />
                <Input type="title" placeholder="교수명" className="m-2 w-30" variant="bordered" onChange={(e) => setProfessorInSelfForm(e.target.value)} />
                <Input type="title" placeholder="학과명" className="m-2 w-30" variant="bordered" onChange={(e) => setMajorInSelfForm(e.target.value)} />
                <Input type="number" placeholder="학점" className="m-2 w-30" variant="bordered" onChange={(e) => setCreditInSelfForm(e.target.value)} />
                <Input type="title" placeholder="강의실명" className="m-2 w-30" variant="bordered" onChange={(e) => setRoomInSelfForm(e.target.value)} />
                <Input type="title" placeholder="시간대구분명" className="m-2 w-30" variant="bordered" onChange={(e) => setGroupInSelfForm(e.target.value)} />
                <Input type="number" placeholder="강의번호" className="m-2 w-30" variant="bordered" onChange={(e) => setLectureNumberInSelfForm(e.target.value)} />
                <Button variant="shadow" color="primary" className="m-2 w-30" onClick={onAddLectureSelfButtonClicked}>
                  직접 입력한 강의 추가
                </Button>
              </AccordionItem>
            </Accordion>
          </div>
        </Card>
      </div>
    </>
  );
}