const mockNavigate = jest.fn();

export const __mockNavigate = mockNavigate;
export const useNavigate = () => mockNavigate;
