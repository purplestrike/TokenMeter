import { useState } from 'react';
import { useTokenStore } from '../store/useTokenStore';
import { motion, AnimatePresence } from 'framer-motion';

interface PromptTemplate {
  id: string;
  name: string;
  description: string;
  content: string;
}

const templates: PromptTemplate[] = [
  {
    id: 'user-profile',
    name: 'User Profile with Nested Data',
    description: 'Complex user profile with nested objects, arrays, and metadata',
    content: JSON.stringify({
      user: {
        id: 'usr_123456789',
        personalInfo: {
          firstName: 'Alexandra',
          lastName: 'Chen',
          email: 'alexandra.chen@example.com',
          phone: '+1-555-0123',
          dateOfBirth: '1990-05-15',
          age: 34,
          gender: 'non-binary',
          preferredPronouns: ['they/them']
        },
        address: {
          street: '1234 Innovation Drive',
          apartment: 'Suite 567',
          city: 'San Francisco',
          state: 'CA',
          zipCode: '94105',
          country: 'United States',
          coordinates: {
            latitude: 37.7749,
            longitude: -122.4194
          }
        },
        preferences: {
          theme: 'dark',
          language: 'en-US',
          timezone: 'America/Los_Angeles',
          notifications: {
            email: true,
            sms: false,
            push: true,
            marketing: false
          },
          privacy: {
            profileVisibility: 'public',
            showEmail: false,
            showPhone: false,
            allowDataSharing: false
          }
        },
        subscriptions: [
          {
            id: 'sub_premium',
            name: 'Premium Plan',
            status: 'active',
            startDate: '2023-01-15',
            renewalDate: '2024-01-15',
            price: 29.99,
            currency: 'USD',
            features: ['unlimited_access', 'priority_support', 'advanced_analytics', 'api_access']
          },
          {
            id: 'sub_addon_storage',
            name: 'Extra Storage',
            status: 'active',
            startDate: '2023-06-01',
            price: 9.99,
            currency: 'USD',
            storageGB: 500
          }
        ],
        activity: {
          lastLogin: '2024-01-10T14:32:18Z',
          totalLogins: 1247,
          sessions: [
            {
              id: 'sess_001',
              startTime: '2024-01-10T14:32:18Z',
              endTime: '2024-01-10T16:45:22Z',
              duration: 7984,
              actions: 47,
              ipAddress: '192.168.1.100'
            }
          ],
          achievements: ['early_adopter', 'power_user', 'community_contributor'],
          badges: [
            { name: 'Explorer', earned: '2023-03-20', level: 3 },
            { name: 'Helper', earned: '2023-07-15', level: 2 }
          ]
        },
        metadata: {
          createdAt: '2022-11-01T10:00:00Z',
          updatedAt: '2024-01-10T16:45:22Z',
          version: 12,
          tags: ['premium', 'verified', 'beta_tester'],
          notes: 'High-value customer with excellent engagement metrics'
        }
      }
    }, null, 2)
  },
  {
    id: 'product-catalog',
    name: 'Product Catalog with Arrays',
    description: 'E-commerce product catalog with nested arrays and complex pricing',
    content: JSON.stringify({
      catalog: {
        id: 'cat_electronics_2024',
        name: 'Electronics & Technology',
        description: 'Comprehensive catalog of electronic devices and accessories',
        lastUpdated: '2024-01-10T08:00:00Z',
        totalProducts: 1247,
        categories: [
          {
            id: 'cat_laptops',
            name: 'Laptops',
            products: [
              {
                sku: 'LAP-001-XPS15',
                name: 'Dell XPS 15 9530',
                brand: 'Dell',
                model: 'XPS 15 9530',
                price: {
                  base: 1499.99,
                  currency: 'USD',
                  discount: {
                    percentage: 15,
                    validUntil: '2024-02-01',
                    reason: 'New Year Sale'
                  },
                  final: 1274.99
                },
                specifications: {
                  processor: {
                    brand: 'Intel',
                    model: 'Core i7-13700H',
                    cores: 14,
                    threads: 20,
                    baseClock: '2.4 GHz',
                    maxClock: '5.0 GHz'
                  },
                  memory: {
                    type: 'DDR5',
                    size: 32,
                    unit: 'GB',
                    speed: '4800 MHz',
                    slots: 2,
                    maxCapacity: 64
                  },
                  storage: {
                    type: 'NVMe SSD',
                    capacity: 1024,
                    unit: 'GB',
                    interface: 'PCIe 4.0',
                    readSpeed: '7000 MB/s',
                    writeSpeed: '5000 MB/s'
                  },
                  display: {
                    size: 15.6,
                    sizeUnit: 'inches',
                    resolution: {
                      width: 3456,
                      height: 2160
                    },
                    type: 'OLED',
                    refreshRate: 60,
                    colorGamut: '100% DCI-P3',
                    brightness: 400,
                    brightnessUnit: 'nits'
                  },
                  graphics: {
                    integrated: 'Intel Iris Xe',
                    dedicated: {
                      brand: 'NVIDIA',
                      model: 'RTX 4050',
                      vram: 6,
                      unit: 'GB'
                    }
                  },
                  battery: {
                    capacity: 86,
                    unit: 'Wh',
                    estimatedLife: '8-12 hours',
                    fastCharge: true
                  },
                  connectivity: {
                    wifi: ['Wi-Fi 6E', '802.11ax'],
                    bluetooth: '5.3',
                    ports: [
                      { type: 'USB-C', count: 2, version: 'Thunderbolt 4' },
                      { type: 'USB-A', count: 1, version: '3.2 Gen 1' },
                      { type: 'HDMI', count: 1, version: '2.1' },
                      { type: 'SD Card', count: 1 }
                    ]
                  },
                  dimensions: {
                    width: 13.57,
                    depth: 9.06,
                    height: 0.73,
                    unit: 'inches',
                    weight: 4.23,
                    weightUnit: 'lbs'
                  }
                },
                availability: {
                  inStock: true,
                  quantity: 23,
                  location: 'Warehouse A',
                  shipping: {
                    standard: { days: 5, cost: 0 },
                    express: { days: 2, cost: 29.99 },
                    overnight: { days: 1, cost: 79.99 }
                  }
                },
                reviews: {
                  average: 4.7,
                  count: 342,
                  distribution: {
                    5: 245,
                    4: 67,
                    3: 18,
                    2: 8,
                    1: 4
                  },
                  featured: [
                    {
                      author: 'TechEnthusiast42',
                      rating: 5,
                      date: '2024-01-05',
                      title: 'Excellent performance and build quality',
                      content: 'This laptop exceeded my expectations. The OLED display is stunning, and the RTX 4050 handles all my creative work flawlessly. Battery life is impressive for such a powerful machine.',
                      verified: true,
                      helpful: 89
                    }
                  ]
                },
                tags: ['gaming', 'creative', 'portable', 'premium', 'oled'],
                relatedProducts: ['LAP-002-MBP16', 'LAP-003-LEGION7', 'LAP-004-ROGZ13']
              }
            ]
          }
        ],
        filters: {
          priceRange: { min: 299.99, max: 4999.99 },
          brands: ['Dell', 'Apple', 'Lenovo', 'ASUS', 'HP', 'Microsoft'],
          availability: ['in_stock', 'pre_order', 'backorder'],
          ratings: [4, 4.5, 5]
        },
        metadata: {
          version: '2.1.0',
          schema: 'product_catalog_v2',
          generatedBy: 'catalog_service',
          cacheTTL: 3600
        }
      }
    }, null, 2)
  },
  {
    id: 'event-registration',
    name: 'Event Registration with Mixed Types',
    description: 'Complex event registration form with mixed data types and validation',
    content: JSON.stringify({
      event: {
        id: 'evt_techconf_2024',
        name: 'Tech Innovation Summit 2024',
        description: 'Annual technology conference featuring AI, cloud computing, and emerging technologies',
        type: 'conference',
        category: 'technology',
        status: 'open_registration',
        dates: {
          start: '2024-06-15T09:00:00Z',
          end: '2024-06-17T18:00:00Z',
          timezone: 'America/New_York',
          duration: {
            days: 3,
            hours: 27
          }
        },
        location: {
          venue: {
            name: 'Convention Center Downtown',
            address: {
              street: '100 Convention Way',
              city: 'New York',
              state: 'NY',
              zipCode: '10001',
              country: 'United States'
            },
            capacity: 5000,
            rooms: [
              {
                id: 'main_hall',
                name: 'Grand Ballroom',
                capacity: 2000,
                features: ['stage', 'projection', 'sound_system', 'wifi']
              },
              {
                id: 'workshop_a',
                name: 'Workshop Room A',
                capacity: 150,
                features: ['whiteboard', 'projection', 'wifi']
              }
            ]
          },
          coordinates: {
            latitude: 40.7128,
            longitude: -74.0060
          },
          parking: {
            available: true,
            cost: 25.00,
            currency: 'USD',
            capacity: 800
          }
        },
        registration: {
          openDate: '2024-01-01T00:00:00Z',
          closeDate: '2024-06-10T23:59:59Z',
          earlyBirdEnd: '2024-03-31T23:59:59Z',
          pricing: {
            earlyBird: {
              general: 299.99,
              student: 149.99,
              vip: 599.99,
              currency: 'USD'
            },
            regular: {
              general: 399.99,
              student: 199.99,
              vip: 799.99,
              currency: 'USD'
            },
            groupDiscount: {
              enabled: true,
              minAttendees: 5,
              discountPercent: 15
            }
          },
          capacity: {
            total: 5000,
            reserved: 3247,
            available: 1753,
            waitlistEnabled: true,
            waitlistCount: 142
          },
          requirements: {
            ageRestriction: false,
            minAge: null,
            maxAge: null,
            professionalLevel: ['beginner', 'intermediate', 'advanced', 'expert'],
            requiredDocuments: [],
            dietaryOptions: ['vegetarian', 'vegan', 'gluten_free', 'kosher', 'halal', 'none']
          }
        },
        agenda: {
          tracks: [
            {
              id: 'track_ai',
              name: 'Artificial Intelligence',
              color: '#3B82F6',
              sessions: [
                {
                  id: 'sess_001',
                  title: 'The Future of Large Language Models',
                  speaker: {
                    name: 'Dr. Sarah Johnson',
                    title: 'Chief AI Scientist',
                    company: 'AI Innovations Inc.',
                    bio: 'Leading researcher in NLP and transformer architectures',
                    photo: 'https://example.com/speakers/sarah-johnson.jpg'
                  },
                  time: {
                    start: '2024-06-15T10:00:00Z',
                    end: '2024-06-15T11:00:00Z',
                    duration: 60
                  },
                  room: 'main_hall',
                  capacity: 2000,
                  registered: 1847,
                  description: 'Exploring the latest advances in LLM technology and their practical applications',
                  tags: ['ai', 'llm', 'nlp', 'keynote'],
                  materials: {
                    slides: true,
                    recording: true,
                    codeExamples: true
                  }
                }
              ]
            }
          ]
        },
        sponsors: [
          {
            tier: 'platinum',
            name: 'CloudTech Solutions',
            logo: 'https://example.com/sponsors/cloudtech.png',
            contribution: 50000,
            benefits: ['keynote_slot', 'exhibition_booth', 'branding', 'networking_event']
          }
        ],
        contact: {
          email: 'info@techsummit2024.com',
          phone: '+1-555-TECH-2024',
          website: 'https://techsummit2024.com',
          socialMedia: {
            twitter: '@TechSummit2024',
            linkedin: 'tech-innovation-summit',
            facebook: 'TechSummit2024'
          }
        },
        metadata: {
          createdAt: '2023-11-15T10:00:00Z',
          updatedAt: '2024-01-10T14:30:00Z',
          version: 3,
          published: true,
          featured: true
        }
      }
    }, null, 2)
  },
  {
    id: 'survey-data',
    name: 'Survey Data with Long Text Fields',
    description: 'Comprehensive survey response with extensive text fields and nested structures',
    content: JSON.stringify({
      survey: {
        id: 'surv_customer_satisfaction_2024_q1',
        title: 'Customer Satisfaction & Product Feedback Survey',
        description: 'Quarterly survey to gather comprehensive feedback on products, services, and overall experience',
        version: '2.1',
        period: {
          start: '2024-01-01T00:00:00Z',
          end: '2024-03-31T23:59:59Z',
          quarter: 'Q1',
          year: 2024
        },
        response: {
          id: 'resp_987654321',
          submittedAt: '2024-01-15T14:32:18Z',
          duration: 1247,
          unit: 'seconds',
          respondent: {
            id: 'usr_respondent_456',
            email: 'customer.feedback@example.com',
            customerSince: '2021-06-15',
            customerTier: 'premium',
            totalPurchases: 47,
            lifetimeValue: 12450.75,
            currency: 'USD'
          },
          sections: [
            {
              id: 'section_overall',
              title: 'Overall Experience',
              questions: [
                {
                  id: 'q_overall_satisfaction',
                  type: 'rating',
                  question: 'How satisfied are you with our overall service?',
                  answer: 4,
                  scale: {
                    min: 1,
                    max: 5,
                    labels: {
                      1: 'Very Dissatisfied',
                      2: 'Dissatisfied',
                      3: 'Neutral',
                      4: 'Satisfied',
                      5: 'Very Satisfied'
                    }
                  },
                  required: true
                },
                {
                  id: 'q_recommendation',
                  type: 'nps',
                  question: 'How likely are you to recommend our service to a friend or colleague?',
                  answer: 9,
                  scale: {
                    min: 0,
                    max: 10
                  },
                  category: 'promoter',
                  required: true
                },
                {
                  id: 'q_overall_feedback',
                  type: 'long_text',
                  question: 'Please provide detailed feedback about your overall experience. What did you like most? What could be improved?',
                  answer: 'I have been using this service for nearly three years now, and I must say the overall experience has been quite positive. The user interface is intuitive and well-designed, making it easy to navigate and find what I need. The customer support team has always been responsive and helpful whenever I encountered any issues. The product quality has been consistently high, and I appreciate the regular updates and new features that are added based on user feedback. However, I would like to see improvements in the mobile app experience, as it sometimes feels slower than the web version. Additionally, I think the pricing could be more competitive, especially for long-term customers like myself. The documentation and tutorials are helpful, but I believe more video content would be beneficial for new users. Overall, I am satisfied with the service and will continue using it, but there is definitely room for improvement in certain areas.',
                  minLength: 50,
                  maxLength: 2000,
                  wordCount: 187,
                  required: false
                }
              ]
            },
            {
              id: 'section_product',
              title: 'Product-Specific Feedback',
              questions: [
                {
                  id: 'q_product_features',
                  type: 'multi_select',
                  question: 'Which features do you use most frequently? (Select all that apply)',
                  options: [
                    'Dashboard Analytics',
                    'API Integration',
                    'Automated Workflows',
                    'Custom Reports',
                    'Team Collaboration',
                    'Mobile App',
                    'Data Export',
                    'Third-party Integrations'
                  ],
                  answer: [
                    'Dashboard Analytics',
                    'API Integration',
                    'Automated Workflows',
                    'Custom Reports'
                  ],
                  required: true
                },
                {
                  id: 'q_feature_requests',
                  type: 'long_text',
                  question: 'What new features or improvements would you like to see in future updates? Please be as specific as possible.',
                  answer: 'I would love to see several enhancements that would significantly improve my workflow. First, a more advanced filtering system in the dashboard that allows for complex multi-criteria searches with saved filter presets. Second, I think implementing a dark mode that is easier on the eyes would be great, especially for users who work long hours. Third, I would appreciate better integration with project management tools like Asana and Trello, as I currently have to manually sync data between platforms. Fourth, the ability to create custom templates for reports would save me a lot of time. Fifth, I think adding real-time collaboration features similar to Google Docs would be fantastic for team projects. Finally, I believe improving the mobile app performance and adding offline capabilities would make it much more useful when I am traveling or in areas with poor connectivity. These features would make the product even more valuable to me and my team.',
                  minLength: 100,
                  maxLength: 1500,
                  wordCount: 198,
                  required: false
                },
                {
                  id: 'q_bug_reports',
                  type: 'long_text',
                  question: 'Have you encountered any bugs or technical issues? If yes, please describe them in detail, including when they occurred and steps to reproduce.',
                  answer: 'Yes, I have encountered a few issues over the past quarter. The most significant one was a data synchronization problem that occurred in mid-February. When I made changes to a project on my desktop, those changes did not appear on my mobile device for approximately 4-6 hours, even after refreshing and restarting the app. This was particularly frustrating when I was working on time-sensitive tasks. I reported this issue through the support portal, and it was resolved within 48 hours. Another minor issue I noticed is that the export function sometimes fails when exporting large datasets (over 10,000 rows) to CSV format, giving an error message that is not very descriptive. This has happened three times in the past quarter. Additionally, I have noticed that the search functionality can be slow when searching through projects with many files and folders, sometimes taking 5-10 seconds to return results. I have not reported these issues yet, but I plan to do so. Overall, the platform is stable, but these issues do impact my productivity occasionally.',
                  minLength: 0,
                  maxLength: 2000,
                  wordCount: 234,
                  required: false
                }
              ]
            },
            {
              id: 'section_support',
              title: 'Customer Support Experience',
              questions: [
                {
                  id: 'q_support_rating',
                  type: 'rating',
                  question: 'How would you rate the quality of customer support?',
                  answer: 5,
                  scale: {
                    min: 1,
                    max: 5
                  },
                  required: true
                },
                {
                  id: 'q_support_feedback',
                  type: 'long_text',
                  question: 'Please share your experience with our customer support team. Include details about response time, helpfulness, and resolution of your inquiries.',
                  answer: 'My experience with the customer support team has been exceptional. Every time I have reached out, whether through email, live chat, or phone, the representatives have been knowledgeable, courteous, and genuinely interested in helping me resolve my issues. The response times are impressive - I typically receive an initial response within 2-4 hours for email inquiries, and the live chat support is almost always available with minimal wait times. When I encountered the data synchronization issue I mentioned earlier, the support agent not only helped me resolve the immediate problem but also provided me with workarounds and best practices to prevent similar issues in the future. They followed up with me after the issue was resolved to ensure everything was working correctly, which I really appreciated. The support documentation and knowledge base are also comprehensive and well-organized, making it easy to find answers to common questions. I have recommended this service to several colleagues, and the quality of customer support is one of the main reasons I continue to be a loyal customer.',
                  minLength: 50,
                  maxLength: 2000,
                  wordCount: 211,
                  required: false
                }
              ]
            }
          ],
          metadata: {
            device: 'desktop',
            browser: 'Chrome 120.0',
            os: 'Windows 11',
            ipAddress: '192.168.1.100',
            anonymized: false,
            consentGiven: true
          }
        }
      }
    }, null, 2)
  },
  {
    id: 'project-data',
    name: 'Complex Nested Project Data',
    description: 'Detailed project management data with tasks, dependencies, and team collaboration',
    content: JSON.stringify({
      project: {
        id: 'proj_enterprise_platform_2024',
        name: 'Enterprise Platform Modernization',
        description: 'Comprehensive modernization of legacy enterprise platform with microservices architecture, cloud migration, and enhanced security features',
        status: 'in_progress',
        priority: 'high',
        type: 'software_development',
        category: 'infrastructure',
        visibility: 'internal',
        createdAt: '2023-09-01T08:00:00Z',
        updatedAt: '2024-01-10T16:45:22Z',
        startDate: '2023-09-15T00:00:00Z',
        targetEndDate: '2024-06-30T23:59:59Z',
        actualEndDate: null,
        timeline: {
          phases: [
            {
              id: 'phase_planning',
              name: 'Planning & Design',
              status: 'completed',
              startDate: '2023-09-15T00:00:00Z',
              endDate: '2023-11-30T23:59:59Z',
              duration: 77,
              unit: 'days',
              progress: 100,
              deliverables: [
                'Architecture Design Document',
                'Technical Specifications',
                'Security Assessment',
                'Migration Plan'
              ]
            },
            {
              id: 'phase_development',
              name: 'Development & Implementation',
              status: 'in_progress',
              startDate: '2023-12-01T00:00:00Z',
              endDate: '2024-04-30T23:59:59Z',
              duration: 151,
              unit: 'days',
              progress: 45,
              deliverables: [
                'Core Microservices',
                'API Gateway',
                'Database Migration Scripts',
                'Authentication Service'
              ]
            },
            {
              id: 'phase_testing',
              name: 'Testing & Quality Assurance',
              status: 'not_started',
              startDate: '2024-05-01T00:00:00Z',
              endDate: '2024-06-15T23:59:59Z',
              duration: 46,
              unit: 'days',
              progress: 0,
              deliverables: [
                'Test Plans',
                'Automated Test Suite',
                'Performance Test Results',
                'Security Audit Report'
              ]
            },
            {
              id: 'phase_deployment',
              name: 'Deployment & Launch',
              status: 'not_started',
              startDate: '2024-06-16T00:00:00Z',
              endDate: '2024-06-30T23:59:59Z',
              duration: 15,
              unit: 'days',
              progress: 0,
              deliverables: [
                'Production Deployment',
                'Documentation',
                'Training Materials',
                'Post-Launch Support Plan'
              ]
            }
          ]
        },
        team: {
          members: [
            {
              id: 'usr_lead_dev',
              name: 'Michael Rodriguez',
              role: 'Lead Developer',
              email: 'michael.rodriguez@company.com',
              department: 'Engineering',
              allocation: 100,
              unit: 'percent',
              skills: ['backend_development', 'microservices', 'cloud_architecture', 'kubernetes'],
              joinedDate: '2023-09-01T00:00:00Z',
              responsibilities: [
                'Architecture design and review',
                'Core service development',
                'Code review and mentoring',
                'Technical decision making'
              ]
            },
            {
              id: 'usr_dev_1',
              name: 'Emily Chen',
              role: 'Senior Backend Developer',
              email: 'emily.chen@company.com',
              department: 'Engineering',
              allocation: 100,
              unit: 'percent',
              skills: ['python', 'fastapi', 'postgresql', 'docker'],
              joinedDate: '2023-09-15T00:00:00Z',
              responsibilities: [
                'API development',
                'Database schema design',
                'Integration testing'
              ]
            },
            {
              id: 'usr_dev_2',
              name: 'James Wilson',
              role: 'DevOps Engineer',
              email: 'james.wilson@company.com',
              department: 'Infrastructure',
              allocation: 75,
              unit: 'percent',
              skills: ['kubernetes', 'aws', 'terraform', 'ci_cd', 'monitoring'],
              joinedDate: '2023-10-01T00:00:00Z',
              responsibilities: [
                'Infrastructure setup',
                'CI/CD pipeline configuration',
                'Monitoring and logging',
                'Security hardening'
              ]
            },
            {
              id: 'usr_qa',
              name: 'Sarah Thompson',
              role: 'QA Lead',
              email: 'sarah.thompson@company.com',
              department: 'Quality Assurance',
              allocation: 50,
              unit: 'percent',
              skills: ['test_automation', 'performance_testing', 'security_testing', 'selenium'],
              joinedDate: '2024-01-01T00:00:00Z',
              responsibilities: [
                'Test strategy development',
                'Test case creation',
                'Automated test suite maintenance',
                'Bug tracking and verification'
              ]
            }
          ],
          totalMembers: 4,
          totalAllocation: 325
        },
        tasks: [
          {
            id: 'task_001',
            title: 'Design Microservices Architecture',
            description: 'Create comprehensive architecture design document outlining service boundaries, communication patterns, and data flow',
            status: 'completed',
            priority: 'critical',
            assignee: 'usr_lead_dev',
            createdBy: 'usr_lead_dev',
            createdAt: '2023-09-15T08:00:00Z',
            updatedAt: '2023-10-15T17:30:00Z',
            dueDate: '2023-10-20T23:59:59Z',
            completedAt: '2023-10-15T17:30:00Z',
            estimatedHours: 40,
            actualHours: 38,
            tags: ['architecture', 'design', 'documentation'],
            dependencies: [],
            subtasks: [
              {
                id: 'subtask_001_1',
                title: 'Define service boundaries',
                status: 'completed',
                estimatedHours: 8,
                actualHours: 7
              },
              {
                id: 'subtask_001_2',
                title: 'Design API contracts',
                status: 'completed',
                estimatedHours: 12,
                actualHours: 11
              },
              {
                id: 'subtask_001_3',
                title: 'Create data flow diagrams',
                status: 'completed',
                estimatedHours: 10,
                actualHours: 10
              },
              {
                id: 'subtask_001_4',
                title: 'Document security requirements',
                status: 'completed',
                estimatedHours: 10,
                actualHours: 10
              }
            ],
            comments: [
              {
                id: 'comment_001',
                author: 'usr_lead_dev',
                content: 'Architecture review completed. Ready for stakeholder approval.',
                createdAt: '2023-10-15T17:30:00Z'
              }
            ]
          },
          {
            id: 'task_002',
            title: 'Implement Authentication Service',
            description: 'Develop OAuth2-based authentication service with JWT tokens, refresh token mechanism, and multi-factor authentication support',
            status: 'in_progress',
            priority: 'high',
            assignee: 'usr_dev_1',
            createdBy: 'usr_lead_dev',
            createdAt: '2023-12-01T08:00:00Z',
            updatedAt: '2024-01-10T14:20:00Z',
            dueDate: '2024-01-31T23:59:59Z',
            completedAt: null,
            estimatedHours: 80,
            actualHours: 52,
            progress: 65,
            tags: ['backend', 'security', 'authentication'],
            dependencies: ['task_001'],
            subtasks: [
              {
                id: 'subtask_002_1',
                title: 'Set up OAuth2 server',
                status: 'completed',
                estimatedHours: 16,
                actualHours: 14
              },
              {
                id: 'subtask_002_2',
                title: 'Implement JWT token generation',
                status: 'completed',
                estimatedHours: 12,
                actualHours: 11
              },
              {
                id: 'subtask_002_3',
                title: 'Add refresh token mechanism',
                status: 'in_progress',
                estimatedHours: 16,
                actualHours: 12,
                progress: 75
              },
              {
                id: 'subtask_002_4',
                title: 'Implement MFA support',
                status: 'not_started',
                estimatedHours: 20,
                actualHours: 0
              },
              {
                id: 'subtask_002_5',
                title: 'Write unit and integration tests',
                status: 'not_started',
                estimatedHours: 16,
                actualHours: 0
              }
            ],
            comments: [
              {
                id: 'comment_002',
                author: 'usr_dev_1',
                content: 'OAuth2 server setup complete. Starting JWT implementation.',
                createdAt: '2023-12-10T10:15:00Z'
              },
              {
                id: 'comment_003',
                author: 'usr_dev_1',
                content: 'JWT implementation done. Working on refresh tokens now.',
                createdAt: '2024-01-05T14:30:00Z'
              }
            ]
          }
        ],
        budget: {
          allocated: 500000,
          currency: 'USD',
          spent: 187500,
          remaining: 312500,
          breakdown: {
            personnel: {
              allocated: 400000,
              spent: 150000,
              remaining: 250000
            },
            infrastructure: {
              allocated: 75000,
              spent: 25000,
              remaining: 50000
            },
            tools: {
              allocated: 15000,
              spent: 8500,
              remaining: 6500
            },
            training: {
              allocated: 10000,
              spent: 4000,
              remaining: 6000
            }
          }
        },
        risks: [
          {
            id: 'risk_001',
            title: 'Cloud Migration Complexity',
            description: 'Potential challenges during migration of legacy systems to cloud infrastructure',
            probability: 'medium',
            impact: 'high',
            status: 'monitoring',
            mitigation: 'Engaged cloud migration specialists and created detailed migration runbook',
            owner: 'usr_dev_2'
          },
          {
            id: 'risk_002',
            title: 'Resource Availability',
            description: 'Key team members may be required for other critical projects',
            probability: 'low',
            impact: 'high',
            status: 'mitigated',
            mitigation: 'Secured dedicated allocation for core team members',
            owner: 'usr_lead_dev'
          }
        ],
        metrics: {
          completion: 38,
          unit: 'percent',
          velocity: {
            storyPoints: 42,
            period: 'sprint',
            trend: 'increasing'
          },
          quality: {
            bugCount: 12,
            criticalBugs: 2,
            testCoverage: 68,
            unit: 'percent'
          },
          timeline: {
            onSchedule: true,
            daysAhead: 5,
            riskLevel: 'low'
          }
        },
        integrations: [
          {
            name: 'GitHub',
            type: 'version_control',
            status: 'connected',
            repositories: ['enterprise-platform-backend', 'enterprise-platform-frontend']
          },
          {
            name: 'Jira',
            type: 'project_management',
            status: 'connected',
            projectKey: 'EPM'
          },
          {
            name: 'Slack',
            type: 'communication',
            status: 'connected',
            channels: ['#enterprise-platform', '#epm-alerts']
          }
        ],
        metadata: {
          version: 1,
          schema: 'project_v2',
          tags: ['enterprise', 'modernization', 'cloud', 'microservices', 'high_priority'],
          customFields: {
            businessUnit: 'Engineering',
            strategicInitiative: 'Digital Transformation',
            complianceRequired: ['SOC2', 'GDPR', 'HIPAA']
          }
        }
      }
    }, null, 2)
  },
  {
    id: 'plaintext-article',
    name: 'Plaintext Article',
    description: 'Long-form article with narrative text, paragraphs, and natural language',
    content: `The Future of Artificial Intelligence: A Comprehensive Analysis

Introduction

Artificial intelligence has emerged as one of the most transformative technologies of the 21st century, fundamentally reshaping how we interact with machines, process information, and solve complex problems. From the early days of rule-based systems to the current era of large language models and neural networks, AI has evolved at an unprecedented pace, presenting both extraordinary opportunities and significant challenges for society.

The Evolution of AI Technology

The journey of artificial intelligence began in the 1950s with pioneers like Alan Turing, who proposed the fundamental question: "Can machines think?" This philosophical inquiry laid the groundwork for decades of research and development. Early AI systems relied heavily on symbolic reasoning and expert systems, where human knowledge was explicitly encoded into computer programs. These systems could perform specific tasks well, such as playing chess or diagnosing medical conditions, but they lacked the flexibility and learning capabilities we see in modern AI.

The breakthrough came with the development of machine learning algorithms that could learn from data rather than being explicitly programmed. Neural networks, inspired by the structure of the human brain, began to show promise in pattern recognition tasks. However, it wasn't until the 2010s that deep learning truly revolutionized the field, thanks to advances in computational power, the availability of massive datasets, and improved algorithms.

Current State of AI Applications

Today, artificial intelligence permeates nearly every aspect of our daily lives, often in ways we don't even realize. Natural language processing systems power virtual assistants like Siri, Alexa, and Google Assistant, enabling us to interact with technology using conversational language. Computer vision algorithms enable facial recognition, autonomous vehicles, and medical image analysis. Recommendation systems drive the content we see on social media platforms, streaming services, and e-commerce websites.

In healthcare, AI is being used to analyze medical images, predict disease outbreaks, and assist in drug discovery. Machine learning models can identify patterns in medical scans that might be missed by human eyes, potentially leading to earlier diagnoses and better patient outcomes. In finance, AI algorithms detect fraudulent transactions, optimize trading strategies, and assess credit risk with remarkable accuracy.

The business world has embraced AI for process automation, customer service chatbots, and data analytics. Companies use AI to optimize supply chains, predict maintenance needs for equipment, and personalize marketing campaigns. These applications demonstrate AI's ability to handle vast amounts of data and identify patterns that would be impossible for humans to process manually.

Challenges and Ethical Considerations

Despite its tremendous potential, artificial intelligence presents significant challenges that society must address. One of the primary concerns is bias in AI systems. Machine learning models learn from historical data, which may contain biases related to race, gender, socioeconomic status, or other factors. If not carefully addressed, these biases can be perpetuated and even amplified by AI systems, leading to unfair outcomes in hiring, lending, criminal justice, and other critical areas.

Privacy is another major concern. AI systems often require large amounts of personal data to function effectively. The collection, storage, and use of this data raise questions about individual privacy rights and data security. There's a delicate balance between the benefits of AI-powered services and the protection of personal information.

Job displacement is a frequently discussed concern, as AI and automation have the potential to replace human workers in various industries. While some jobs may be eliminated, history suggests that new jobs will also be created. However, the transition period may be challenging, requiring retraining and education programs to help workers adapt to the changing economy.

The explainability of AI decisions, often referred to as the "black box" problem, is another significant challenge. Many advanced AI systems, particularly deep learning models, make decisions in ways that are difficult for humans to understand or explain. This lack of transparency can be problematic in high-stakes applications like medical diagnosis or criminal sentencing, where understanding the reasoning behind a decision is crucial.

The Future Landscape

Looking ahead, several trends are likely to shape the future of artificial intelligence. Large language models, like GPT-4 and similar systems, have demonstrated remarkable capabilities in understanding and generating human-like text. These models are becoming increasingly sophisticated, with applications ranging from content creation to code generation to scientific research assistance.

Multimodal AI systems that can process and understand multiple types of data simultaneously—text, images, audio, and video—are emerging as the next frontier. These systems could enable more natural human-computer interactions and more comprehensive understanding of complex, real-world scenarios.

Edge AI, where AI processing happens on local devices rather than in the cloud, is gaining traction. This approach offers benefits in terms of privacy, latency, and reliability, making AI more accessible and practical for applications like autonomous vehicles and IoT devices.

The integration of AI with other emerging technologies, such as quantum computing, blockchain, and augmented reality, promises to create new possibilities and applications we can only begin to imagine.

Conclusion

Artificial intelligence stands at a pivotal moment in its development. The technology has moved from science fiction to practical reality, with applications that touch nearly every aspect of modern life. As we continue to advance AI capabilities, it's crucial that we do so thoughtfully, addressing ethical concerns, ensuring fairness and transparency, and preparing society for the changes that AI will bring.

The future of AI is not predetermined. It will be shaped by the choices we make today—in research priorities, in policy and regulation, in education and workforce development, and in how we choose to deploy these powerful technologies. By approaching AI development with both ambition and responsibility, we can harness its potential to solve some of humanity's greatest challenges while ensuring that the benefits are shared broadly and equitably.

The journey ahead will require collaboration between technologists, policymakers, ethicists, and society at large. Together, we can build an AI-powered future that enhances human capabilities, improves quality of life, and creates opportunities for all. The question is not whether AI will continue to evolve and impact our world—that is certain. The question is how we will guide that evolution to create the best possible outcomes for humanity.`
  },
  {
    id: 'custom-input',
    name: 'Custom Input',
    description: 'Enter your own custom prompt to calculate tokens',
    content: ''
  }
];

export function PromptTemplates() {
  const { setInput } = useTokenStore();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const handleSelectTemplate = (template: PromptTemplate) => {
    setInput(template.content);
    setSelectedTemplate(template.id);
  };

  const handleClear = () => {
    setInput('');
    setSelectedTemplate(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg mb-6"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors rounded-lg"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">📋</span>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Prompt Templates
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Select a template to test with complex, realistic data
            </p>
          </div>
        </div>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-gray-500 dark:text-gray-400"
        >
          ▼
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-2 border-t border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
                {templates.map((template) => (
                  <motion.button
                    key={template.id}
                    onClick={() => handleSelectTemplate(template)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      selectedTemplate === template.id
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-400'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-gray-50 dark:bg-gray-700/50'
                    }`}
                  >
                    <div className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                      {template.name}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      {template.description}
                    </div>
                    {selectedTemplate === template.id && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-2 text-xs text-blue-600 dark:text-blue-400 font-medium"
                      >
                        ✓ Selected
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>
              
              {selectedTemplate && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
                >
                  <button
                    onClick={handleClear}
                    className="px-4 py-2 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-md hover:bg-red-200 dark:hover:bg-red-800 transition-colors font-medium text-sm"
                  >
                    🗑️ Clear Template
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

