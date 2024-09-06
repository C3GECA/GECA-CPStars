# GECA-CPStars

Welcome to the C-Cube Competitive Programming Leaderboard! This platform is designed to showcase the top-performing students from our college who are actively participating in competitive programming across platforms like Codeforces, LeetCode, and CodeChef.

## Table of Contents

- [Features](#features)
- [Expected Stack](#Expected-Stack)
- [Roadmap](#roadmap)
  - [Phase 1: Initial Setup](#phase-1-initial-setup)
  - [Phase 2: Core Functionality](#phase-2-core-functionality)
  - [Phase 3: Advanced Features](#phase-3-advanced-features)
  - [Phase 4: Final Touches](#phase-4-final-touches)
- [Contribution Tasks](#contribution-tasks)
- [Getting Started](#getting-started)
- [Contributing](#contributing)
- [License](#license)


## Features
- **Leaderboard Display**: Show a leaderboard with top students based on their ratings and achievements.
- **Student Profiles**: Provide detailed profiles for each student, including their competitive programming ratings, solved problems, and recent activity.
- **Platform Integration**: Fetch and display real-time data from Codeforces, LeetCode, CodeChef, and other competitive programming platforms.
- **Performance Metrics**: Display key metrics such as ratings, rankings, and problem-solving statistics.
- **Search and Filter**: Enable users to search and filter the leaderboard based on different criteria.
- **Responsive Design**: Ensure that the platform is accessible on various devices, including desktops, tablets, and mobiles.
- **Real-Time Updates**: Keep the leaderboard updated with the latest data from competitive programming platforms.

## Expected Tech Stack
> May change according to requirement
1. Nextjs (Typescript preffered but porting can be done later)
2. Tailwind with Shadcn Components
3. Backend: Nextjs preffered but other can be used for now
4. API: [clist.by](https://clist.by/api/v4/doc/) api for fetching profiles all at once (as some platforms do not provide api access)
5. Framer-motion(Optional) - for animations
6. Sqlite database for userinfo. (lite cz we don't need much)

## Roadmap

### Phase 1: Initial Setup
- **Project Setup**: Initialize the repository and set up the basic project structure.
- **UI/UX Design**: Design the user interface and layout for the leaderboard and student profiles.
- **Basic Features**: Implement user registration, profile management, and basic leaderboard functionality.

### Phase 2: Core Functionality
- **Platform Integration**: Develop functionality to fetch and display real-time data from Codeforces, LeetCode, CodeChef, etc.
- **Leaderboard Display**: Create and display the leaderboard with sorted student rankings.
- **Profile Details**: Build detailed student profiles including ratings, rankings, and solved problems.

### Phase 3: Advanced Features
- **Search and Filter**: Add search and filtering options to customize the leaderboard view.
- **Real-Time Updates**: Implement real-time updates for the leaderboard based on new data.
- **Performance Analytics**: Provide detailed analytics and insights into student performance and trends.

### Phase 4: Final Touches
- **Testing and QA**: Conduct comprehensive testing and quality assurance to ensure a smooth user experience.
- **Deployment**: Deploy the platform to a production environment.
- **Feedback and Iteration**: Collect user feedback and make improvements based on suggestions.

## Contribution Tasks
- [x] **Setup Repo**: Clone and configure the repository.
- [ ] **Design UI**: Create mockups for the leaderboard and profiles.
- [ ] **Build APIs**: Develop APIs for data retrieval.
- [ ] **Frontend Dev**: Implement the leaderboard UI.
- [ ] **Integrate APIs**: Connect UI with backend data.
- [ ] **Fetch Data**: Implement data fetching from CP platforms.
- [ ] **Sort Leaderboard**: Create sorting algorithms for rankings.
- [ ] **Profile Details**: Display student profiles with ratings.
- [ ] **Real-Time Data**: Implement live updates for leaderboard.
- [ ] **Write Tests**: Develop unit and integration tests.
- [x] **Deploy**: Publish the platform online.
- [ ] **Bug Fixes**: Address and fix reported issues.

## Getting Started

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/C3GECA/GECA-CPStars.git
   ```
2. **Install Dependencies**:
   ```bash
   npm i
   ```
3. **Start Development Server**
   ```bash
   npm start
   ```
4. Open the Application: Navigate to `http://localhost:3000` in your browser.

## Contributing
We welcome contributions from the community! To contribute:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
