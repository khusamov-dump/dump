object Form1: TForm1
  Left = 318
  Top = 185
  BorderIcons = [biSystemMenu]
  BorderStyle = bsSingle
  ClientHeight = 460
  ClientWidth = 760
  Color = clBtnFace
  Font.Charset = DEFAULT_CHARSET
  Font.Color = clWindowText
  Font.Height = -11
  Font.Name = 'MS Sans Serif'
  Font.Style = []
  OldCreateOrder = False
  Position = poDesktopCenter
  OnShow = FormShow
  PixelsPerInch = 96
  TextHeight = 13
  object Label1: TLabel
    Left = 8
    Top = 8
    Width = 173
    Height = 13
    Caption = #1084#1072#1090#1088#1080#1094#1072' '#1089#1090#1086#1080#1084#1086#1089#1090#1077#1081' '#1088#1077#1073#1077#1088' '#1075#1088#1072#1092#1072
  end
  object Label2: TLabel
    Left = 16
    Top = 312
    Width = 86
    Height = 44
    Caption = #1074#1099#1073#1077#1088#1080#1090#1077' '#1080#1089#1090#1086#1095#1085#1080#1082
    Font.Charset = DEFAULT_CHARSET
    Font.Color = clGray
    Font.Height = -19
    Font.Name = 'Arial'
    Font.Style = []
    ParentFont = False
    WordWrap = True
  end
  object Memo1: TMemo
    Left = 232
    Top = 24
    Width = 521
    Height = 433
    Font.Charset = DEFAULT_CHARSET
    Font.Color = clWindowText
    Font.Height = -13
    Font.Name = 'Arial'
    Font.Style = []
    ParentFont = False
    ScrollBars = ssVertical
    TabOrder = 0
  end
  object StringGrid1: TStringGrid
    Left = 8
    Top = 24
    Width = 217
    Height = 147
    BorderStyle = bsNone
    Color = clWhite
    ColCount = 7
    DefaultColWidth = 30
    DefaultRowHeight = 20
    FixedColor = 16250871
    RowCount = 7
    Options = [goFixedVertLine, goFixedHorzLine, goVertLine, goHorzLine, goRangeSelect, goEditing, goAlwaysShowEditor]
    ScrollBars = ssNone
    TabOrder = 1
    OnSetEditText = StringGrid1SetEditText
  end
  object Button1: TButton
    Left = 8
    Top = 184
    Width = 217
    Height = 33
    Caption = #1079#1072#1087#1086#1083#1085#1080#1090#1100' '#1090#1072#1073#1083#1080#1094#1091' '#1076#1083#1103' '#1087#1088#1080#1084#1077#1088#1072
    TabOrder = 2
    OnClick = Button1Click
  end
  object Button2: TButton
    Left = 8
    Top = 264
    Width = 217
    Height = 33
    Caption = #1072#1083#1075'. '#1044#1077#1081#1082#1089#1090#1088#1099
    TabOrder = 3
    OnClick = Button2Click
  end
  object Button7: TButton
    Left = 8
    Top = 224
    Width = 217
    Height = 33
    Caption = #1087#1086#1082#1072#1079#1072#1090#1100' '#1075#1088#1072#1092' '#1076#1083#1103' '#1087#1088#1080#1084#1077#1088#1072
    TabOrder = 4
    OnClick = Button7Click
  end
  object CheckBox1: TCheckBox
    Left = 17
    Top = 360
    Width = 30
    Height = 17
    Caption = '1'
    Font.Charset = DEFAULT_CHARSET
    Font.Color = clWindowText
    Font.Height = -16
    Font.Name = 'Arial'
    Font.Style = []
    ParentFont = False
    TabOrder = 5
  end
  object CheckBox6: TCheckBox
    Left = 73
    Top = 424
    Width = 30
    Height = 17
    Caption = '6'
    Font.Charset = DEFAULT_CHARSET
    Font.Color = clWindowText
    Font.Height = -16
    Font.Name = 'Arial'
    Font.Style = []
    ParentFont = False
    TabOrder = 6
  end
  object CheckBox5: TCheckBox
    Left = 73
    Top = 392
    Width = 30
    Height = 17
    Caption = '5'
    Font.Charset = DEFAULT_CHARSET
    Font.Color = clWindowText
    Font.Height = -16
    Font.Name = 'Arial'
    Font.Style = []
    ParentFont = False
    TabOrder = 7
  end
  object CheckBox4: TCheckBox
    Left = 73
    Top = 360
    Width = 30
    Height = 17
    Caption = '4'
    Font.Charset = DEFAULT_CHARSET
    Font.Color = clWindowText
    Font.Height = -16
    Font.Name = 'Arial'
    Font.Style = []
    ParentFont = False
    TabOrder = 8
  end
  object CheckBox3: TCheckBox
    Left = 17
    Top = 424
    Width = 30
    Height = 17
    Caption = '3'
    Font.Charset = DEFAULT_CHARSET
    Font.Color = clWindowText
    Font.Height = -16
    Font.Name = 'Arial'
    Font.Style = []
    ParentFont = False
    TabOrder = 9
  end
  object CheckBox2: TCheckBox
    Left = 17
    Top = 392
    Width = 30
    Height = 17
    Caption = '2'
    Font.Charset = DEFAULT_CHARSET
    Font.Color = clWindowText
    Font.Height = -16
    Font.Name = 'Arial'
    Font.Style = []
    ParentFont = False
    TabOrder = 10
  end
end
