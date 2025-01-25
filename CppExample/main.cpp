#include <windows.h>
#include <stdio.h>
#include <uxtheme.h>
#include <commctrl.h>
#include <WinUser.h>

#pragma comment(lib, "uxtheme.lib")
#pragma comment(lib, "Comctl32.lib")

LRESULT CALLBACK WndProc(HWND hwnd, UINT msg, WPARAM wParam, LPARAM lParam)
{
	switch (msg)
	{
	case WM_DESTROY:
		PostQuitMessage(0);
		break;
	default:
		return DefWindowProcW(hwnd, msg, wParam, lParam);
	}
	return 0;
}

int WINAPI WinMain(HINSTANCE hInstance, HINSTANCE hPrevInstance, LPSTR lpCmdLine, int nCmdShow)
{
	AllocConsole(); // Attach a console window

	FILE *stream;
	freopen_s(&stream, "CONOUT$", "w", stdout); // Redirect stdout to the console

	INITCOMMONCONTROLSEX icex = {sizeof(INITCOMMONCONTROLSEX), ICC_STANDARD_CLASSES};
	InitCommonControlsEx(&icex);

	LPCWSTR iconFilePath = L"E:\\Work\\Personal\\ffi\\src\\examples\\notepad\\notepad.ico";

	// Load the .ico file
	HICON hIcon = (HICON)LoadImageW(
			NULL,												// hInstance: NULL because we're loading from the file system
			iconFilePath,								// File path to the .ico file
			IMAGE_ICON,									// Type of image to load
			32,													// Desired width of the icon
			32,													// Desired height of the icon
			LR_LOADFROMFILE | LR_SHARED // Load options: from file and shareable
	);

	if (hIcon == NULL)
	{
		// If loading failed, print the error
		DWORD error = GetLastError();
		wprintf(L"Failed to load icon from file. Error code: %lu\n", error);
	}

	wprintf(L"Icon loaded successfully from file: %ls\n", iconFilePath);

	const wchar_t CLASS_NAME[] = L"MyWindowClass";

	WNDCLASSEX wc = {};

	wc.cbSize = sizeof(WNDCLASSEX);
	wc.style = CS_HREDRAW | CS_VREDRAW;
	wc.lpfnWndProc = WndProc;
	wc.hInstance = hInstance;
	wc.hCursor = LoadCursorW(NULL, IDC_ARROW);
	wc.hbrBackground = (HBRUSH)(COLOR_WINDOW + 1);
	wc.lpszClassName = CLASS_NAME;
	wc.hIcon = hIcon;
	wc.hIconSm = hIcon;

	if (!RegisterClassExW(&wc))
	{
		MessageBoxW(NULL, L"Window Registration Failed!", L"Error!", MB_ICONEXCLAMATION | MB_OK);
		return 0;
	}

	HWND hwnd = CreateWindowExW(
			0,									 // Optional window styles
			CLASS_NAME,					 // Window class
			L"My Window",				 // Window text
			WS_OVERLAPPEDWINDOW, // Window style
			CW_USEDEFAULT,			 // Position X
			CW_USEDEFAULT,			 // Position y
			500,								 // Width
			300,								 // Height
			NULL,								 // Parent window
			NULL,								 // Menu
			hInstance,					 // Instance handle
			NULL								 // Additional application data
	);

	SetWindowTheme(hwnd, L"Explorer", NULL);

	HWND okButtonHandle = CreateWindowExW(
			0,
			L"BUTTON",
			L"OK",
			WS_TABSTOP | WS_VISIBLE | WS_CHILD | BS_DEFPUSHBUTTON,
			10,
			10,
			100,
			25,
			hwnd,
			NULL,
			hInstance,
			NULL);

	HWND cancelButtonHandle = CreateWindowExW(
			0,
			L"BUTTON",
			L"Cancel",
			WS_VISIBLE | WS_CHILD | BS_PUSHBUTTON,
			120,
			10,
			100,
			25,
			hwnd,
			NULL,
			hInstance,
			NULL);

	printf("hInstance: %p\n", (void *)hInstance);

	if (hwnd == NULL)
	{
		MessageBox(NULL, L"Window Creation Failed!", L"Error!", MB_ICONEXCLAMATION | MB_OK);
		return 0;
	}

	ShowWindow(hwnd, nCmdShow);
	UpdateWindow(hwnd);

	MSG msg;
	while (GetMessageW(&msg, NULL, 0, 0))
	{
		TranslateMessage(&msg);
		DispatchMessageW(&msg);
	}

	return (int)msg.wParam;
}
