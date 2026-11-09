/*
 * MechaBot Competition Academy — content data
 * --------------------------------------------
 * Toàn bộ nội dung của competition.html và challenge.html được khai báo ở đây,
 * tách khỏi phần hiển thị (competition.js). Muốn thêm chương trình, thử thách,
 * sự kiện hay thành tích: chỉ cần thêm một object vào mảng tương ứng.
 *
 * Quy ước nội dung:
 * - Không ghi ngày sự kiện, giải thưởng, kết quả hay luật thi khi chưa có dữ liệu thật.
 * - Trường để null / [] sẽ được ẩn hoặc hiển thị trạng thái "đang cập nhật".
 */
window.MECHABOT_COMPETITION = {
  /* ---------- SECTION 2: chương trình luyện thi ---------- */
  programs: [
    {
      id: 'vex',
      name: 'VEX Robotics Competition',
      icon: '🤖',
      accent: 'blue',
      image: 'assets/competition/vex-field.webp',
      imageAlt: 'Robot VEX IQ trên sân thi đấu chính thức',
      intro: 'Thiết kế, chế tạo và lập trình robot thi đấu theo đội, theo định dạng mùa giải VEX IQ và VEX V5.',
      skills: ['Thiết kế robot & cơ khí', 'Lập trình tự hành (Autonomous)', 'Chiến thuật thi đấu', 'Phối hợp đồng đội', 'Luyện tập theo thể thức thi đấu'],
      // Độ tuổi lấy từ trang chi tiết vex-robotics.html
      age: 'VEX IQ: Tiểu học – THCS · VEX V5: THPT',
      href: 'vex-robotics.html',
    },
    {
      id: 'weeemake',
      name: 'Weeemake Robotics Challenge',
      icon: '🛠️',
      accent: 'orange',
      image: 'assets/competition/weeemake-arena.webp',
      imageAlt: 'Robot thi đấu trên sa bàn Weeemake Robotics Competition',
      intro: 'Lắp ráp robot, lập trình cảm biến và tối ưu điểm số trên sa bàn thử thách.',
      skills: ['Lắp ráp robot', 'Lập trình cảm biến', 'Dò line & tránh vật cản', 'Thử thách trên sa bàn', 'Tối ưu thuật toán & điểm số'],
      age: 'Phù hợp từ cấp Tiểu học',
      href: 'weeemake-competition.html',
    },
    {
      id: 'wro',
      name: 'World Robot Olympiad (WRO)',
      icon: '🌐',
      accent: 'green',
      image: 'assets/competition/wro-field.webp',
      imageAlt: 'Robot thi đấu trên sa bàn chính thức World Robot Olympiad',
      intro: 'Robot tự hành giải các nhiệm vụ trên sa bàn, rèn tư duy thuật toán và khả năng gỡ lỗi dưới áp lực thời gian.',
      skills: ['Robot tự hành', 'Tư duy thuật toán', 'Thử thách theo nhiệm vụ', 'Giải quyết vấn đề & debug', 'Chuẩn bị thi đấu'],
      age: 'Elementary · Junior · Senior',
      href: 'wro.html',
    },
    {
      id: 'enjoyai',
      name: 'EnjoyAI Robotics Challenge',
      icon: '🧠',
      accent: 'purple',
      image: 'assets/competition/enjoyai-render.webp',
      imageAlt: 'Sa bàn thi đấu chính thức Enjoy AI',
      intro: 'Thử thách robot sáng tạo kết hợp AI: điều khiển, lập trình và ra quyết định dựa trên dữ liệu cảm biến.',
      skills: ['Thử thách robot sáng tạo', 'Điều khiển & lập trình robot', 'Ra quyết định từ cảm biến', 'Luyện tập theo hướng thi đấu'],
      age: 'Dành cho 15–18+ tuổi',
      href: 'enjoyai.html',
    },
    {
      id: 'khkt',
      name: 'Khoa học Kỹ thuật & STEM',
      icon: '🔬',
      accent: 'teal',
      image: 'assets/competition/lab-engineering.webp',
      imageAlt: 'Học sinh lắp ráp mạch điện tử cho robot tại phòng Lab',
      intro: 'Phát triển dự án nghiên cứu từ ý tưởng đến nguyên mẫu, hồ sơ kỹ thuật và phần thuyết trình trước hội đồng.',
      skills: ['Phát triển dự án nghiên cứu', 'Điện tử, AI, IoT & tự động hóa', 'Chế tạo nguyên mẫu & hồ sơ kỹ thuật', 'Thuyết trình dự án', 'Trình diễn kỹ thuật'],
      age: 'Dành cho học sinh THCS & THPT',
      href: 'khoa-hoc-ky-thuat.html',
    },
  ],

  /* ---------- SECTION 3: MechaBot Challenge Arena ----------
   * difficulty: 1–4 (Cơ bản → Chuyên sâu)
   * arena: kiểu hình minh họa sa bàn (line | delivery | obstacle | city)
   * duration: thời gian hoàn thành dự kiến — để null cho tới khi được chốt
   * video: { src, poster, caption } hoặc null
   * rules / scoring: để [] cho tới khi có luật chính thức; trang chi tiết sẽ
   *   hiển thị trạng thái "đang hoàn thiện" thay vì bịa luật.
   */
  difficultyLabels: ['', 'Cơ bản', 'Trung bình', 'Nâng cao', 'Chuyên sâu'],
  challenges: [
    {
      id: 'line-tracking',
      code: '01',
      name: 'Line Tracking Master',
      difficulty: 1,
      arena: 'line',
      objective: 'Robot bám theo đường line định sẵn và về đích chính xác.',
      skills: ['Cảm biến dò line', 'Điều khiển động cơ', 'Thuật toán bám line'],
      duration: null,
      mission:
        'Robot xuất phát từ vạch Start, tự động bám theo đường line đen qua các khúc cua, giao lộ và đoạn đứt quãng để dừng đúng vị trí đích. Thử thách giúp học sinh làm chủ cảm biến hồng ngoại và tư duy điều khiển vòng kín.',
      technical: ['Robot có tối thiểu 2 cảm biến dò line', 'Hoạt động hoàn toàn tự hành, không điều khiển từ xa', 'Kích thước robot phù hợp với độ rộng đường line của sa bàn'],
      rules: [],
      scoring: [],
      video: {
        src: 'assets/video_young_maker/clips/line-maze-challenge.mp4',
        poster: 'assets/video_young_maker/posters/line-maze-challenge.jpg',
        caption: 'Video minh họa: robot dò line trong mê cung — bài thực hành từ khóa Young Maker.',
      },
    },
    {
      id: 'smart-delivery',
      code: '02',
      name: 'Smart Delivery Mission',
      difficulty: 2,
      arena: 'delivery',
      objective: 'Robot vận chuyển và giao vật phẩm tới đúng các điểm chỉ định.',
      skills: ['Định vị trên sa bàn', 'Cơ cấu gắp / chở hàng', 'Lập kế hoạch lộ trình'],
      duration: null,
      mission:
        'Robot nhận vật phẩm tại kho, di chuyển qua mạng lưới đường của sa bàn và giao tới các điểm đích theo thứ tự. Học sinh phải cân bằng giữa tốc độ, độ chính xác và độ ổn định của cơ cấu chở hàng.',
      technical: ['Robot có cơ cấu gắp, đẩy hoặc chở vật phẩm', 'Tự hành hoặc bán tự hành tùy cấp độ', 'Vật phẩm không được rơi khỏi robot trong quá trình di chuyển'],
      rules: [],
      scoring: [],
      video: {
        src: 'assets/video_ai_starter_kit/clips/ai-warehouse-robot.mp4',
        poster: 'assets/video_ai_starter_kit/posters/ai-warehouse-robot.jpg',
        caption: 'Video minh họa kỹ năng liên quan: robot nhận diện và vận chuyển hàng trong kho.',
      },
    },
    {
      id: 'obstacle-avoidance',
      code: '03',
      name: 'Obstacle Avoidance',
      difficulty: 3,
      arena: 'obstacle',
      objective: 'Robot phát hiện vật cản và tìm đường di chuyển an toàn.',
      skills: ['Cảm biến siêu âm', 'Ra quyết định thời gian thực', 'Thuật toán tìm đường'],
      duration: null,
      mission:
        'Sa bàn được bố trí các vật cản thay đổi vị trí giữa các lượt. Robot phải tự phát hiện, đánh giá khoảng cách và chọn hướng né để tới đích mà không va chạm.',
      technical: ['Robot có cảm biến khoảng cách (siêu âm hoặc hồng ngoại)', 'Hoạt động hoàn toàn tự hành', 'Không dùng bản đồ vị trí vật cản lập trình sẵn'],
      rules: [],
      scoring: [],
      video: null,
    },
    {
      id: 'smart-city',
      code: '04',
      name: 'Smart City Autonomous Mission',
      difficulty: 4,
      arena: 'city',
      objective: 'Robot hoàn thành chuỗi nhiệm vụ trong mô hình thành phố thông minh.',
      skills: ['Tích hợp đa cảm biến', 'Lập trình chuỗi nhiệm vụ', 'Chiến thuật & quản lý thời gian'],
      duration: null,
      mission:
        'Thử thách tổng hợp trên sa bàn Smart City: robot tuân thủ đèn tín hiệu, dò đường, tránh vật cản, giao hàng và đỗ xe vào vị trí — tất cả trong một lượt chạy. Đây là bài kiểm tra mức độ sẵn sàng thi đấu của học sinh.',
      technical: ['Kết hợp nhiều loại cảm biến trên cùng một robot', 'Hoạt động tự hành trong suốt lượt chạy', 'Chương trình chia module theo từng nhiệm vụ'],
      rules: [],
      scoring: [],
      video: null,
    },
  ],

  /* ---------- SECTION 4: lộ trình ---------- */
  roadmap: [
    { key: 'FOUNDATION', title: 'Nền tảng Robotics', icon: '🔧', items: ['Lắp ráp robot', 'Lập trình cơ bản', 'Nguyên lý cảm biến', 'Thử thách cơ bản'] },
    { key: 'CHALLENGE', title: 'Luyện thi chuyên sâu', icon: '🎯', items: ['Nhiệm vụ theo thể thức thi đấu', 'Lập trình nâng cao', 'Debug & tối ưu', 'Quản lý thời gian'] },
    { key: 'TEAM SELECTION', title: 'Tuyển chọn đội tuyển', icon: '🧩', items: ['Thi đấu nội bộ', 'Đánh giá kỹ thuật', 'Đánh giá làm việc nhóm', 'Mô phỏng thi đấu'] },
    { key: 'CHAMPIONSHIP', title: 'Sẵn sàng thi đấu', icon: '🏆', items: ['Chuẩn bị thi đấu nâng cao', 'Xây dựng chiến thuật', 'Mô phỏng toàn bộ trận đấu', 'Đánh giá mức độ sẵn sàng'] },
  ],

  /* ---------- SECTION 5: sự kiện ----------
   * Mẫu một sự kiện:
   * {
   *   name: 'Mock Competition tháng 12',
   *   type: 'Thi thử',                 // Workshop | Thử thách nội bộ | Thi thử | Tuyển chọn đội tuyển
   *   date: '2026-12-14',              // YYYY-MM-DD
   *   time: '08:30 – 11:30',
   *   location: 'Cơ sở 2 – Vinhomes Ocean Park 2',
   *   status: 'open',                  // open | full | closed | soon
   *   ctaLabel: 'Đăng ký tham gia',
   *   ctaHref: '#dang-ky',
   * }
   */
  events: [],

  /* ---------- SECTION 6: dấu ấn học sinh ----------
   * type: 'photo' | 'video'. Chỉ thêm hình ảnh / thành tích có thật.
   */
  gallery: [
    { type: 'photo', src: 'assets/hero-slide-3.jpg', alt: 'Học sinh thi đấu robot tại sân chơi công nghệ', tag: 'Thi đấu', caption: 'Học sinh thi đấu robot tại sân chơi công nghệ' },
    { type: 'photo', src: 'assets/hero-slide-2.jpg', alt: 'Học sinh vui vẻ với mô hình robot lắp ráp', tag: 'Hoạt động nhóm', caption: 'Cùng nhau hoàn thiện robot' },
    { type: 'photo', src: 'assets/hero-slide-1.jpg', alt: 'Học sinh cùng lắp ráp mô hình bằng bìa carton', tag: 'Dự án', caption: 'Dự án sáng tạo của học sinh' },
    {
      type: 'video',
      src: 'assets/video_young_maker/clips/line-maze-challenge.mp4',
      poster: 'assets/video_young_maker/posters/line-maze-challenge.jpg',
      alt: 'Robot dò line trong mê cung',
      tag: 'Robot demo',
      caption: 'Robot dò line vượt mê cung',
    },
  ],
  // Danh mục chưa có nội dung thật → hiển thị ô "sắp cập nhật"
  galleryPending: ['Thành tích thi đấu', 'Video hoàn thành thử thách'],
};
