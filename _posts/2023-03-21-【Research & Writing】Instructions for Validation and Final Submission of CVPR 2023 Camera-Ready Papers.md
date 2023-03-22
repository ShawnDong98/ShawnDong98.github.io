---
layout:     post
title:      "【Research & Writing】Instructions for Validation and Final Submission of CVPR 2023 Camera-Ready Papers"
subtitle:   ""
date:       2023-03-21
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - CVPR 2023
    - Research & Writing
---

仔细阅读这些说明并严格遵循它们，以尽量减少 conference proceedings 的 production 中出现的问题和延误。

最终提交（完成以下所有步骤）的截止日期是2023年3月24日太平洋夏令时间晚上11:59。

这个截止日期不会延长。截止日期后到达的论文可能不会出现在会议记录中，也可能不会放在 IEEE Xplore 中。

**Note**： CVPR 2023会议记录将仅向已注册的与会者提供。会议记录将包含主要会议和相关研讨会的所有文件（和补充材料）。会议记录仅在会议期间以及会议前和会议后的短时间内提供。所有按时提交的符合IEEE Xplore且已完成IEEE版权的CVPR论文，将在会议后不久放入IEEE Xplore。

完成最终的 CVPR 2023 论文提交有一个可选步骤和四个必要步骤：

0） （可选）改善受视觉影响的PDF可访问性。

1）使用IEEE PDF eXpress 验证您的 Camera-Ready Paper（不含页码）。

2） 注册CVPR 2023的作者。

3） 将经过验证的PDF和论文信息提交到论文收集网站：[https://openreview.net/group?id=thecvf.com/CVPR/2023/Conference/Authors](https://openreview.net/group?id=thecvf.com/CVPR/2023/Conference/Authors)


4） 填写并提交IEEE电子版权表格


这些步骤详述如下。


# 0. (Optional) Add the “axessibility” package to your LaTex-generated camera-ready PDF.

虽然是可选的，但 CVPR 2023  Program Chairs 强烈鼓励作者在 LaTex 文档开头附近添加以下行（与其他 “usepackage” 行）以包括“axessibility”包：

```latex
\usepackage[accsupp]{axessibility}  % Improves PDF readability for those with disabilities.
```

“axessibility” 软件包链接如下：

[https://ctan.org/pkg/axessibility?lang=en](https://ctan.org/pkg/axessibility?lang=en)

并提高辅助技术（例如PDF阅读器）在PDF文件中读取LaTeX公式的能力。


# 1. Use IEEE PDF eXpress to validate your paper for inclusion in IEEE Xplore.

**IMPORTANT NOTE:** 不要在camera-ready 的 paper 中包含页码。

会议记录中的PDF文件有10 MB（10,485,760字节）的严格大小限制。如果你的论文比这个大，你可能在图表中使用了非常大的图像。通常，您的图像在每英寸600像素时看起来会很好，您应该相应地对图表中使用的图像进行下采样。较小的PDF文件也通过PDF eXpress更快地验证。

所有论文的页数限制为8页，额外的页面仅允许引用的参考文献。为了澄清，论文的正文，包括数字、表格、方程、致谢等，不得超过8页。其他页面只能包含引用的参考资料，而不是 acknowledgments、附录、补充材料或其他文本、图表、表格等。请注意，没有 paper 或额外页面费用。然而，超过8页的论文（不包括参考资料）将不会被处理，也不会出现在会议记录或IEEE Xplore上。

IEEE要求输入IEEE Xplore数字图书馆的所有论文都符合IEEE风格指南。与IEEE要求兼容的LaTeX和MS Word样式文件可通过CVPR 2023网站获得：

[https://cvpr2023.thecvf.com/Conferences/2023/AuthorGuidelines](https://cvpr2023.thecvf.com/Conferences/2023/AuthorGuidelines)

不符合这些准则的论文将不会放在Xplore中。这是IEEE的政策。


**Note:** PDF eXpress不收集文件。验证您的论文后，您仍然必须将其上传到 Camera-Ready 收集网站（OpenReview）进行 production，如第3步所述。


使用IEEE PDF eXpress有两种方法。如果您生成 PDF 文件，PDF eXpress可以验证它。如果您使用的是以下任何文档格式化系统，PDF eXpress可以从以下源文件生成符合Xplore的文档：MS Word、WordPerfect、RTF（富文本格式）、Freelance、LaTeX、PageMaker、FrameMaker、Word Pro或Quark。如果您使用LaTeX、PageMaker或Quark准备论文，则需要一些额外的步骤才能向IEEE提供图像。

- 登录PDF express：[https://ieee-pdf-express.org/](https://ieee-pdf-express.org/), 会议ID是：52729X
- 如果您以前没有使用过PDF eXpress，则必须创建一个帐户。单击“新用户”按钮，然后按照说明操作。如果您在之前的会议上使用了PDF eXpress，您可以使用上次会议的电子邮件地址和密码登录；然后它会要求您通过输入密码为该会议创建一个帐户——它可以是相同的密码。验证（并在必要时更新）您的联系信息，然后单击“提交”。一旦您有了帐户，您可以随时登录，以处理所有论文。
- 为您提交的每篇论文创建一个新标题。
- 提交您想要验证的 PDF 文件或提交您想要转换的源文件。PDF eXpress 将消化提交的文件，并酌情向您发送一封包含验证结果或生成的PDF的电子邮件。
- 重复步骤d，直到您对结果感到满意。
- 转到步骤c来处理您的其他文件。

验证失败的主要来源是在数字中使用不可嵌入的字体。确保您的论文使用可嵌入的字体作为论文的正文以及数字、图形标题、参考文献、脚注等。另一个故障来源是LaTeX源文件中包含超引用包的行。如果你有困难，你可能想评论这行。如果您在使用IEEE PDF eXpress时遇到进一步的问题，请联系pdfsupport@ieee.org

# 2. Register an author for the conference.

通过CVPR“注册”网页 ([https://cvpr2023.thecvf.com/Conferences/2023/Pricing2](https://cvpr2023.thecvf.com/Conferences/2023/Pricing2)) 顶部的注册链接注册CVPR 2023。每篇论文至少有一名作者必须注册完整的 in-person 护照才能参加会议。如果没有一位作者注册参加会议，该论文将不会包含在会议记录中，也不会出现在IEEE Xplore中。同样，由于没有出现而没有提交的论文和海报将不会出现在程序中。

# 3. Final paper submission for production


- 登录OpenReview论文收集网站：[https://openreview.net/group?id=thecvf.com/CVPR/2023/Conference/Authors](https://openreview.net/group?id=thecvf.com/CVPR/2023/Conference/Authors)- - 您接受的论文将列在 OpenReview “Author Console” 的 “Your Submissions” 选项卡下。 要创建/编辑 camera-ready 提交，请单击论文标题以将您带到论文摘要页面，然后单击 “Camera Ready Submission” 按钮（右上角），以将您带到已接受论文的 camera-ready submission 页面。目前不要点击“Copyright Submission”。在更新论文标题和作者列表并提交  camera-ready 论文后，您将稍后提交 electronic copyright 表格（在下面的第4步中）。
- 验证论文标题和摘要是否正确。如有必要，请更新论文标题和/或摘要，以匹配您的 camera-ready submission。请注意，只有在事先批准（例如，在审稿人建议的情况下）的情况下，才能从最初提交的论文标题进行更改。
- - **Note:** 确保摘要更新到您的最新版本，并且作为纯文本提交，没有任何 LaTex（或其他形式的）标记。这将有助于将您的论文（和摘要）纳入CVF开放获取档案。摘要作为从 OpenReview 收到的纯文本发布在 CVF 上，没有修改——如果它看起来乱，因为它是作为带有LaTex标记的纯文本提交的，那么它在 CVF 上看起来会很乱。
- 正如CVPR 2023作者指南所指出的，“作者名单在论文提交截止日期（11月11日）后被视为最终的，此后不允许更改，也不允许更改已接受的论文。”因此，编辑作者列表（添加或删除作者）的能力已被禁用，用于 camera-ready submissions。因此，不允许在最终论文中添加或删除作者。请注意，未经批准，允许对作者列表进行重新排序，并且可以使用每个列出的作者右侧的箭头在 OpenReview 中完成。
- 如果数据集是您论文的关键科学贡献之一，您必须在 “Dataset URL” 字段（靠近 camera-ready 表单的底部）中提供该数据集的链接。
- 在作者列表下方的 “PDF” 字段中上传您的 camera-ready PDF 文件（由PDF eXpress验证）。
- 如果您希望提供补充材料，请在“补充材料”字段中以20 MB或以下的单个PDF或ZIP文件的形式上传您的补充文件。仅允许PDF和ZIP文件作为补充材料。你可以把任何东西放在这个文件中——电影、代码、其他结果、随附的技术报告——任何可能使你的论文对读者更有用的东西。如果您的补充材料包括视频或图像数据，建议您使用常见的编解码器和文件格式。这将使尽可能多的读者能够查看材料（一个理想的结果）。补充材料将仅包含在会议记录中；它不会在IEEE Xplore上存档，也不需要由IEEE PDF eXpress验证。
- 验证您是否上传了正确的 camera-ready PDF（由 PDF eXpress 验证）作为 camera-ready 提交。每年至少有一位作者不小心提交了错误的 PDF 作为 camera-ready 提交。
- 您必须同意或回答所有问题和acknowledgments，除非问题或确 acknowledgments 被指定为可选或回复是有条件的。在您回答所有问题之前，您将无法完成 camera-ready 提交过程。请注意，只要您计划提交完整的表格（见下文第4步），您就可以同意有关版权表格的问题。
- 不要忘记单击页面底部的 “Submit” 按钮以保存所有更改。除非您按下 “Submit” 按钮，否则您对 camera-ready 提交所做的任何更改（包括文件上传和对标题、摘要和作者列表的更改）都不会被保存。
- 在您的 camera-ready 论文提交被视为完成之前，您必须首先填写并提交IEEE  Electronic Copyright 表格，如下文第4步所述。如果您多次提交论文，论文收集网站将记住您已经填写了该论文的版权表格，因此您不必重新提交电子版权。


# 4. Complete and digitally sign the IEEE Electronic Copyright Form for your paper and submit it along with your final paper.